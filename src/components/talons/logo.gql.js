import { gql } from '@apollo/client';

export const  LET_STORE_LOGO = gql`
    query getStoreLogo {
    storeConfig {
        id
        header_logo_src
        logo_alt
        logo_height
        logo_width
        store_code
    }
}`;
