/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
import lodash from 'lodash';
import React from 'react';
import { useLocation } from 'react-router-dom';

export function useQueryParams<T>(): { [key: string]: T } {
  const location = useLocation();
  const query = React.useMemo(() => {
    const urlParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(urlParams);
    return Object.keys(params).reduce((acc: any, key) => {
      acc[key] = toObject(params[key]);
      return acc;
    }, params);
  }, [location]);
  return query;
}

export function toObject(param: string, default_value?: any) {
  try {
    return JSON.parse(param, (key, val) => {
      if (param.startsWith('0')) {
        return param;
      }
      return val;
    });
  } catch (e) {
    if (default_value === undefined) {
      return param;
    }
  }
  return default_value;
}

export function removeEmpty(data: any) {
  const cvData = Object.keys(data).reduce((acc, key) => {
    if (typeof data[key] === 'number' || !lodash.isEmpty(data[key])) {
      acc[key] = data[key];
    }
    return acc;
  }, {});
  return cvData;
}

export function toString(data: any) {
  if (typeof data !== 'object') {
    return data;
  }
  try {
    const cvData = Object.keys(data).reduce((acc, key) => {
      if (typeof data[key] === 'number' || !lodash.isEmpty(data[key])) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    return JSON.stringify(cvData);
  } catch (e) {
    /* empty */
  }
}

export function toSearch(queryParams: any) {
  return Object.keys(queryParams)
    .filter(
      key =>
        typeof queryParams[key] === 'number' ||
        !lodash.isEmpty(queryParams[key]),
    )
    .map(key => `${key}=${encodeURIComponent(toString(queryParams[key]))}`)
    .join('&');
}
