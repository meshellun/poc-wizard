import { isPlatform } from '@ionic/react';

import { Capacitor } from '@capacitor/core'

export const EMAIL_VALIDATION_PATTERN = "^([a-zA-Z0-9_\\-.+]+)@([a-zA-Z0-9_\\-.+]+)\\.([a-zA-Z]{2,5})$";

export const deliveryMethods = [
    'Check (via Regular Mail)',
    'Check FedEx Overnight Delivery ($30 Fee)',
    'Direct Deposit',
    'Cashier Check ($30 Fee)',
    'Domestic Wire ($30 Fee)',
    // MVP for Bill Pay will not include this delivery method
    // 'International Wire ($50 fee)'
  ]

export const formatDateToString = (date: Date) => {
    return [
        String(date.getFullYear()),
        String(101 + date.getMonth()).substring(1),
        String(100 + date.getDate()).substring(1),
    ].join('-');
}

export const states = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA',  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];

export const formatNumber = (n: any) => {
    return n?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const formatDateStringToDate = (dateString: string | undefined) : (string | undefined) => {
    if (dateString) {
        let date = new Date(dateString);
        return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
    }
}

export const formatUnitPrice = (n: any) => {
    let split = n.split('.');
    return (split[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '.' + split[1]);
}

export const isMobile = () => {
    return (isPlatform('iphone') || isPlatform('android') || isPlatform('ipad'));
}

export const isPhone = () => {
  return (isPlatform('iphone') || isPlatform('android'));
}

export const isMobileWeb = () => (!Capacitor.isNative && isMobile())
