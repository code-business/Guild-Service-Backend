import { config } from 'dotenv';
config();

const constantsInfo = {
  PORT: process.env.PORT,
  SWAGGER_KEY: process.env.SWAGGER_KEY,
  NFT_SERVICE_URL: process.env.NFT_SERVICE_URL,
  SOLANA_API: process.env.SOLANA_API,
  MONGO_URL: process.env.MONGO_URL,
};

(function () {
  Object.entries(constantsInfo).forEach((ent: any) => {
    if (!ent[1] || (ent[1] && ent[1].toString().trim() === ''))
      throw new Error('Please provide proper env variables');
  });
})();
export default constantsInfo;
