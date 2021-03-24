export{}
declare global {
    type UserStateActions = setPersonAccount | setSelectedAccount
    type UserState = {
        personAccount?: PersonAccount,
        selectedAccount?: RetirementAccount
    }
}

type setPersonAccount = {
    type: 'setPersonAccount',
    payload: {
        personAccount:PersonAccount
    }
}

type setSelectedAccount = {
    type: 'setSelectedAccount',
    payload: {
        selectedAccount:RetirementAccount
    }
}