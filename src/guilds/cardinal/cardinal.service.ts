import {
  invalidate,
  programs,
  withClaimToken,
  withIssueToken,
} from '@cardinal/token-manager';
import { Injectable } from '@nestjs/common';
import { SignerWallet } from '@saberhq/solana-contrib';
import {
  PublicKey,
  Transaction,
  clusterApiUrl,
  Connection,
  SignaturesForAddressOptions,
  ConfirmedSignatureInfo,
} from '@solana/web3.js';
import { Message } from 'kafkajs';

@Injectable()
export class CardinalService {
  private connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  private adminPublicKey = new PublicKey(process.env.Admin_PublicKey);

  async create_rental(data: any): Promise<any> {
    try {
      const tokenholderAccount = await this.fetchTokenContract(data.badgeId);
      const [transaction, tokenManagerId] = await withIssueToken(
        new Transaction(),
        this.connection,
        new SignerWallet({
          publicKey: new PublicKey(data.lenderAddress),
          secretKey: new Uint8Array([]),
        }),
        {
          mint: new PublicKey(data.badgeId),
          issuerTokenAccountId: new PublicKey(tokenholderAccount),
          kind: 3,
          invalidationType: 1,
          customInvalidators: [
            this.adminPublicKey,
            new PublicKey(data.lenderAddress),
          ],
          visibility: 'permissioned',
          permissionedClaimApprover: new PublicKey(data.borrowerAddress),
        },
      );
      transaction.feePayer = new PublicKey(data.lenderAddress);
      transaction.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;
      console.log(
        'transaction, tokenManagerId ==>',
        transaction,
        'tokenManagerId  =>',
        tokenManagerId.toString(),
      );
      return {
        serialized_txn: transaction
          .serialize({
            requireAllSignatures: false,
            verifySignatures: false,
          })
          .toString('base64'),
      };
    } catch (err) {
      console.log('err ==>', err);
      return { error: err };
    }
  }

  async invalidate_rental(data: any): Promise<any> {
    try {
      const singerWallet = data.lenderAddress
        ? new PublicKey(data.lenderAddress)
        : this.adminPublicKey;
      const transaction = await invalidate(
        this.connection,
        new SignerWallet({
          publicKey: singerWallet,
          secretKey: new Uint8Array([]),
        }),
        new PublicKey(data.badgeId),
      );
      transaction.feePayer = singerWallet;
      transaction.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;

      // let tx = await sendAndConfirmTransaction(this.connection, transaction, [user]);
      // console.log("tx =>", tx);
      return {
        serialized_txn: transaction
          .serialize({
            requireAllSignatures: false,
            verifySignatures: false,
          })
          .toString('base64'),
      };
    } catch (err) {
      console.log('err ==>', err);
      return { error: err };
    }
  }

  async claim_rental(data: any): Promise<any> {
    try {
      const tokenManagerId =
        await programs.tokenManager.pda.tokenManagerAddressFromMint(
          this.connection,
          new PublicKey(data.badgeId),
        );
      const tokenManager = await programs.tokenManager.accounts.getTokenManager(
        this.connection,
        tokenManagerId,
      );
      const claimApprover = tokenManager.parsed.claimApprover;
      const transaction = await withClaimToken(
        new Transaction(),
        this.connection,
        new SignerWallet({
          publicKey: claimApprover,
          secretKey: new Uint8Array([]),
        }),
        new PublicKey(tokenManagerId),
        { payer: this.adminPublicKey },
      );
      transaction.feePayer = this.adminPublicKey;
      transaction.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;
      return {
        serialized_txn: transaction
          .serialize({
            requireAllSignatures: false,
            verifySignatures: false,
          })
          .toString('base64'),
      };
    } catch (err) {
      console.log('err ==>', err);
      return { error: err };
    }
  }

  async fetchTokenContract(badgeId: string) {
    const largestAccounts = await this.connection.getTokenLargestAccounts(
      new PublicKey(badgeId),
    );
    return largestAccounts.value[0].address;
  }

  async getSolanaSignaturesForAddress(
    connection: Connection,
    address: string,
    options: SignaturesForAddressOptions,
    includeErrorSignatures: boolean,
  ): Promise<ConfirmedSignatureInfo[]> {
    {
      const signatures: ConfirmedSignatureInfo[] =
        await connection.getSignaturesForAddress(
          new PublicKey(address),
          options,
          'finalized',
        );
      if (!includeErrorSignatures)
        return signatures.filter((m) => {
          return !m.err || m.err === null;
        });
      return signatures;
    }
  }

  async addSignaturesToTopic(signatures: string[]): Promise<any> {
    const messages: Message[] = [];
    for (const signature of signatures) {
      messages.push({
        key: null,
        value: signature,
      });
    }
  }
}
