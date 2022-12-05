export enum BadgeRecordStatusEnum {
  DRAFT = 'draft',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  LENT = 'lent', //transferred to token manager
  CLAIMED = 'claimed', //claimed by borrower from token manager
  REVOKED = 'revoked', //invalidated by either lender or borrower
}

export enum BadgeTypeEnum {
  CREATOR = 'Creator',
  USER = 'User',
}

export enum BadgeRequestStatusEnum {
  ACTIVE = 'active',
  CANCELLED = 'cancelled', //cancelled by admin
  INACTIVE = 'inactive', //already processed
}
