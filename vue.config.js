module.exports={
    devServer:{
        proxy:{
            ["/dev-api"]:{
                target:'http://localhost:8988',
                changeOrigin:true,
                pathRewrite: {
                    ['^' + "/dev-ap"]: ''
                }
            }
        }

    }
}
