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
    const europeanCountries = ['AD','AL','AT','BA','BE','BG','BY','CH','CY','CZ','DE','DK','EE','ES','FI','FO','FR','GG','GI','GR','HR','HU','IE','IM','IS','IT','JE','LI','LT','LU','LV','MC','MD','MK','MT','NL','NO','PL','PT','RO','RU','SE','SI','SJ','SK','SM','TR','UA','UK','VA','YU']
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