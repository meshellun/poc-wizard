declare global {
    type RetirementAccount = {
        id: string,
        accountFirstName: string,
        accountLastName: string,
        accountNumber: string,
        accountType: string,
        accountPartyType: string,
        accountOpenDate: string,
        accountAssetTitling: string,
        accountUndirectedCashBalance: number,
        accountPendingCashCredits: number,
        accountHoldingsOnDeposits: number,
        accountMinimumCashBalance: number,
        accountPendingCashDebits: number,
        accountPendingFees: number,
        accountTotalAccountValue: number,
    }

    type RelatedParties = {
        id: string,
        name: string,
        address: string,
        partyType: string,
        share: string,
        onlineAccess: boolean,
    }

    type Holding = {
        Id: string,
        Account: {
            Name: string,
            ClientAccount: {
                FirstName: string,
                LastName: string
            }
        },
        Cusip: {
            Name: string,
            ContactName:string,
            ContactPhone:string,
            ContactCompany:string,
            ContactEmail:string,
            ContactFax:string,
            ContactStreet:string,
            ContactCity:string,
            ContactState:string,
            ContactZip:string
        },
        AssetDescription: string,
        MarketValueDate: string,
        MVFromATG: number,
        MarketValuePerUnit: number,
        Units: number
    }

    type RecurringTransactions = {
        id: string,
        transactionType: string,
        status: string,
        frequency: string,
        amount: number,
        tofrom: string,
        deliveryMethod: string,
        goto: string,
    }

    type Documents = {
        Id: string,
        Visible: boolean,
        Type: string,
        Name: string,
        FileName: string,
        Description: string,
        DocDate: string,
        AttachmentId: string,
        MimeType: string
    }
    type TransactionBilling = {
        transactionDate: string,
        transactionDescription: string,
        transactionAmount: number,
    }
}