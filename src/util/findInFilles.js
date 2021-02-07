var findInFiles = require('find-in-files');
//check if we have changed reducer imports for categoreis functions in all components 
const categories=[
    "selectCategory",
    "fetchCategoriesCount",
    "fetchCategories",
    "fetchSelectedCategoryProducts",
    "addCategory",
    "updateCategory",
    "removeCategory",
    "uploadCategoryImage",
].map(c=>"dispatch.categories."+c)

//check if we have changed reducer imports for sector functions  in all components 
const sectors=[
    "fetchSectors",
    "fetchSectorClients",
    "addSector",
    "updateSector"
].map(c=>"dispatch.sector."+c)


findInFiles.find(sectors[3], '../components', '.js$')
    .then(function(results) {
        for (var result in results) {
            var res = results[result];
            console.log(
                'found "' + res.matches[0] + '" ' + res.count
                + ' times in "' + result + '"'
            );
        }
});