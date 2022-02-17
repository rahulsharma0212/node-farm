module.exports=(data,temp)=>{
    
    let output = temp.replace(/{%PRODUCT_IMAGE%}/g , data.image);
    
    output=output.replace(/{%PRODUCT_NAME%}/g , data.productName);
    output=output.replace(/{%PRODUCT_QUANTITY%}/g,data.quantity);
    output=output.replace(/{%PRODUCT_PRICE%}/g,data.price);
    output=output.replace(/{%PRODUCT_DESCRIPTION%}/g,data.description);
    output=output.replace(/{%PRODUCT_NUTRIENTS%}/g,data.nutrients);
    output=output.replace(/{%PRODUCT_FROM%}/g,data.from);
    output=output.replace(/{%PRODUCT_ID%}/g,data.id);
    if(!(data.organic)) output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
    }