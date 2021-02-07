var findInFiles = require('find-in-files');


findInFiles.find("state.products.categories", '../components', '.js$')
    .then(function(results) {
        for (var result in results) {
            var res = results[result];
            console.log(
                'found "' + res.matches[0] + '" ' + res.count
                + ' times in "' + result + '"'
            );
        }
});