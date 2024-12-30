import { useIntl } from 'react-intl';

export const useAltaIntl = () => {
  const intl = useIntl();
  const formatMessage = (key: string): string => {
    return intl.formatMessage({ id: key });
  };
  const formatCurrency = (v:number)=>{
    return intl.formatNumber(v, { style:'currency', currency:'vnd', unitDisplay:'narrow', notation:'standard' });
  };
  return {
    intl,
    formatMessage,
    formatCurrency,
  };
};
