import {useStyle} from "@magento/venia-ui/lib/classify";
import { resourceUrl } from "../../drivers";
import {useQuery} from "@apollo/client";
import {fullPageLoadingIndicator} from "@magento/venia-ui/lib/components/LoadingIndicator";
import ErrorView from "@magento/venia-ui/lib/components/ErrorView/errorView";
import React from "react";
import {LET_STORE_LOGO} from '../talons/logo.gql';

const Logo = () => {

    const { loading, error, data } = useQuery(LET_STORE_LOGO, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
   // console.log( data.storeConfig.header_logo_src);
    if (!data) {
        if (loading) {
            return fullPageLoadingIndicator;
        }

        if (error) {
            return <ErrorView message={error.message} />;
        }
    }
    return ( <img
            src={
                resourceUrl(data.storeConfig.header_logo_src,{
                type:'image-header-logo',
            })
            }
        />

    );
};

export default Logo;

