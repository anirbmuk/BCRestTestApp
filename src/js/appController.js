define(['ojs/ojcore',
        'knockout',
        'crudmodel',
        'ojs/ojknockout',
        'ojs/ojbutton'],
    function (oj, ko, crud) {
        function ControllerViewModel() {
            var self = this;

            var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

            self.appName = ko.observable("JET and BC Demo");
            self.userLogin = ko.observable("anirbmuk");
            
            self.fetchData = function() {
                let rowCount = 0;
                const rowCountUrl = `http://localhost:7101/hr/rest/v1/employeesauth?limit=0&totalResults=true`;
                const successFn = function(data) {
                    if (data) {
                        rowCount = data.totalResults;
                        console.log('Row count:', rowCount);
                        self.fetchAllData(rowCount);
                    }
                };
                const errorFn = function() {
                    console.log('Error while fetching row count');
                };
                crud.getRestData(rowCountUrl, null, successFn, errorFn).then();
            };
            
            self.fetchAllData = function(rowCount) {
                let dataSet = [];
                const fetchPromises = [];
                let offset = 0;
                const limit = 50;
                let dataUrl = ``;
                while (offset <= rowCount) {
                    dataUrl = `http://localhost:7101/hr/rest/v1/employeesauth?limit=${limit}&offset=${offset}&onlyData=true`;
                    console.log('REST URL:', dataUrl);
                    fetchPromises.push(crud.getRestData(dataUrl, null, null, null));
                    offset += limit;
                }
                Promise.all(fetchPromises).then(data => {
                    if (data) {
                        data.forEach(eachOne => {
                            dataSet = dataSet.concat(eachOne.items);
                        });
                    }
                    console.log('Employees:', dataSet);
                });
            };

        }

        return new ControllerViewModel();
    }
);
