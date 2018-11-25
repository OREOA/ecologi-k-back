const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    ean: String,
    isConsumerGood: Boolean,
    attributes: {
        WHERL: {
            value: {
                value: String,
            }
        },
    },
    marketingName: {
        finnish: String,
    },
})

productSchema.statics.format = (product) => {
    const countryCode = product.attributes.WHERL.value.value
    const scandinavianCountries = []
    const europeanCountries = ['AT','BE','BG','CY','CZ','DE','EE','ES','FO','FR','GG','GI','GR','HR','HU','IE','IM','IT','JE','LT','LU','LV','MT','NL','PL','PT','RO','SI','SK','UK','VA']
    return {
        ean: product.ean,
        name: product.marketingName.finnish,
        isDomestic: countryCode === 'FI',
        //isScandinavian: scandinavianCountries.includes(countryCode),
        isEuropean: europeanCountries.includes(countryCode),
        isConsumerGood: product.isConsumerGood,
    }
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product