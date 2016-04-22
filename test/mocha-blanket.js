(function() {

    if (!mocha) {
        throw new Exception("mocha library does not exist in global namespace!");
    }

    var OriginalReporter = mocha._reporter;

    var BlanketReporter = function(runner) {
        runner.on('start', function() {
            blanket.setupCoverage();
        });

        runner.on('end', function() {
            blanket.onTestsDone();
        });

        runner.on('suite', function() {
            blanket.onModuleStart();
        });

        runner.on('test', function() {
            blanket.onTestStart();
        });

        runner.on('test end', function(test) {
            blanket.onTestDone(test.parent.tests.length, test.state === 'passed');
        });

        // NOTE: this is an instance of BlanketReporter
        new OriginalReporter(runner);
    };

    BlanketReporter.prototype = OriginalReporter.prototype;

    mocha.reporter(BlanketReporter);

    var oldRun = mocha.run,
        oldCallback = null;

    mocha.run = function(finishCallback) {
        oldCallback = finishCallback;
        console.log("waiting for blanket...");
    };
    blanket.beforeStartTestRunner({
        callback: function() {
            if (!blanket.options("existingRequireJS")) {
                oldRun(oldCallback);
            }
            mocha.run = oldRun;
        }
    });
})();