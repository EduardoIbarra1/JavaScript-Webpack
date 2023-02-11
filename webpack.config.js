//Necesario para pasar los archivos html a desarrollo
const HtmlWebPackPlugin = require('html-webpack-plugin');
//Necesario para pasar los archivos css a desarrollo
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//Necesario para pasar los archivos img a desarrollo
//Esto solo aplica cuando se importa del html
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'development',

    output:{ //Limpia la carpeta desarrollo cada que se ejecuta npm run build
        clean: true
    },

    module: {
        rules: [ //Reglas de los modulos
            { //Carga los archivos html al modo de desarollo
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false,
                }
            },
            {   //Carga los archivos css al modo de desarrollo
                //Esto solo aplica cuando el css se importa de javascript
                test: /\.css$/,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader']
            },
            { //Carga un archivo css global al modo de desarrollo.
                //Esto solo aplica cuando el css es global
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
            ,
            {   //Carga los archivos img al modo de desarrollo
                //Esto solo aplica cuando la img se importa de javascript
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            
        ]
    },

    optimization: {},

    plugins:[//Configuraciones de plugins
        new HtmlWebPackPlugin({
            title: 'Hola mundo app',
            filename: 'index.html',
            template: './src/index.html', 
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                //Comentar los import de img en los js para no duplicar imgs
                {from: 'src/assets/', to: 'assets/'},
            ]
        }),
    ],
}