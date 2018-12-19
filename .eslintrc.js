module.exports = {
    parser: "babel-eslint",
    extends: "airbnb"
},
    {
        rules: {
            "react/jsx-filename-extension": 0,
            "react/jsx-one-expression-per-line": 0,
            "react/destructuring-assignment": 0,
            "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        }
    }
};