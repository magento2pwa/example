const { Targetables } = require('@magento/pwa-buildpack');
const moduleOverridePlugin = require('../moduleOverrideWebpackPlugin');
const componentOverrideMapping = module.exports={
    ['@magento/venia-ui/lib/components/CreateAccount']:'src/components/Overrides/CreateAccount'
};
const componentOverrideMappingPerigrain = module.exports={
    ['@magento/peregrine/lib/talons/CreateAccount/useCreateAccount.js']:'src/components/Overrides/peregrine/useCreateAccount.js'
};
const componentOverRidingLogo = module.exports={
    ['@magento/peregrine/lib/util/makeUrl']:'src/components/Logo/usemakeUrl.js'
};
 const componentLogo = module.exports={
     ['@magento/venia-ui/lib/components/Logo']:'src/components/Logo/logo.js'
 };

module.exports = targets => {
    const targetables = Targetables.using(targets);
    const ProductDetails = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );
    const LinkedProducts = ProductDetails.addImport(
        "LinkedProducts from '/src/components/LinkedProducts/linkedProducts'"
    );
    ProductDetails
        .insertAfterJSX('<Form />', `<${LinkedProducts} />`)
        .setJSXProps('LinkedProducts', {
            'classes': '{classes}',
            'productDetails': '{productDetails}',
            'options': '{options}',
            'mediaGalleryEntries': '{mediaGalleryEntries}'
        });
    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
    });
    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverrideMappingPerigrain).apply(compiler);
    });
    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverRidingLogo).apply(compiler);
    });
     targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
         new moduleOverridePlugin(componentLogo).apply(compiler);
     });


};
