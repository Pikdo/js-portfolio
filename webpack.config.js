const path = require('path'); // Disponible en node
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const DotEnv = require('dotenv-webpack');
//const {CleanWebpackPlugin} = require('clean-webpack-plugin'); A apartir de la versión 5.20 de webpack solo require un clean:true en el output

// Crear módulo

module.exports = {
    // Aquí van las configuraciones
    // Revisar Typo errores de escritura

    entry: './src/index.js',  // Punto de entrada del app, index.js
    output: {
        path: path.resolve(__dirname, 'dist'), // Punto de salida
        filename: '[name].[contenthash].js', // Nombre del archivo e incorporamos un contenthash para identificar cambios
        assetModuleFilename:  'assets/images/[hash][ext][query]', // Nombre de los archivos assets
        clean:true
    },
    mode:'production',
    resolve: {
        extensions: ['.js'], // Qué extensiones va identificar
        alias : {  // En las rutas de los archivos podemos usar alias para no escribir todas las rutas, ejemplo @utils en lugar de ../src/utils
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@templates': path.resolve(__dirname, 'src/templates'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
        }
    },
    module:{
        rules: [  // Reglas para mjs js.
            {
                test: /\.m?js$/,   // Usar Regex para trabajar con los archivos .mjs de node_modules o .js del proyecto.          
                exclude: /node_modules/, // excluir carpeta
                use: {
                    loader: 'babel-loader'
                }
            },
            { // Aquí se puede agregar el soporte para los preprocesadores como: .styl, .sass .less
                test: /\.css|.styl$/i, // i = case-insensitive .Css, .cSS, .CSS funcionaria
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'stylus-loader'
                    ] // Agregamos un loader para css y preprocesador stylus
            },
            {
                test: /\.png/ ,         // trabajar con imagenes 
                type: 'asset/resource' // para indicar que genere archivos separados
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,  // Trabajar con fonts internas 
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[contenthash].[ext]' // Indica donde guardar los fonts y su nombre
                },
                /*use: {
                    loader: 'url-loader',
                    
                    /*options:{
                        limit: 10000, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
                                      // Habilita o deshabilita la transformación de archivos en base64.
                        mimetype: 'aplication/font-woff',   // Especifica el tipo MIME con el que se alineará el archivo. 
                                                            // Los MIME Types (Multipurpose Internet Mail Extensions)
                                                            // son la manera standard de mandar contenido a través de la red.
                        name: "[name].[contenthash].[ext]",               // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
                                                            // incorporamos un contenthash para identificar cambios
                                                            // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria ubuntu-regularhola.woff
                        outputPath: './assets/fonts/',      // EL DIRECTORIO DE SALIDA
                        publicPath: '../assets/fonts/',      // EL DIRECTORIO PUBLICO
                        esModule: false                     // AVISAR EXPLICITAMENTE SI ES UN MODULO
                    }
                }*/
                //type: 'javascript/auto',  // No duplica los assets
            }
        ]
    },
    plugins: [ // Plugins de webpack
        new HtmlWebpackPlugin({
            inject: true, //Insercion de elementos
            template: './public/index.html', //Archivo plantilla
            filename: './index.html'  // Nombre del archivo de salida
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css' // Agregar los css en assets e incorporamos un contenthash para identificar cambios
        }),
        /*new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),*/
        new DotEnv(),
        // new CleanWebpackPlugin() // Limpia archivos para producción, ahora en webpack5.20 se usa clean:true en el output
    ],
    optimization:{   // Optimización para minimizar
        minimize:true,
        minimizer:[
            new CssMinimizerPlugin(),  // Para minimizar css
            new TerserPlugin()         // Para minimizar javascript
        ]
    }
}