export{}
declare global {
    type CachedObjectActions = setAccounts | setRelatedParties | setInitCache
    type CachedObjectState = {
        accounts: Array<RetirementAccount>,
        relatedParties: Array<RelatedParties>,
        accountAssetHoldings: Array<Holding>,
        recurringTransactions: Array<RecurringTransactions>,
        documents: Array<Documents>,
        transactionBilling: Array<TransactionBilling>,
    }
}

type setAccounts = {
    type: 'setAccounts',
    payload: {
        accounts:Array<RetirementAccount>
    }
}

type setRelatedParties = {
    type: 'setRelatedParties',
    payload: {
        relatedParties:Array<RelatedParties>
    }
}

type setInitCache = {
    type: 'setInitCache',
    payload: {
        accounts: Array<RetirementAccount>,
        relatedParties: Array<RelatedParties>,
        accountAssetHoldings: Array<Holding>,
        recurringTransactions: Array<RecurringTransactions>,
        documents: Array<Documents>,
        transactionBilling: Array<TransactionBilling>,
    }
}