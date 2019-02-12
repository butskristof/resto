var thermal_printer = require("node-thermal-printer");
var printer = require("printer");

var epson = printer.getPrinter("EPSON_TM_T20II");
// module.exports.initPrinter = function() {
// 	printer.init({
// 		type: 'epson',
// 		interface: '/dev/usb/lp0'
// 	});
// };

module.exports.initPrinter = function() {
	thermal_printer.init({
		type: 'epson'
	});
};

module.exports.testPrinter = function () {
	thermal_printer.println("Hello, world!");
	thermal_printer.println("========================");

	// console.log(thermal_printer.getBuffer());

	printer.printDirect({
		data: thermal_printer.getBuffer(),
		printer: epson.name,
		type: "TEXT",
		success: function (job_id) {
			console.log(`Printing OK: ${job_id}`)
		},
		error: function (err) {
			console.log(err)
		}
	});
};

module.exports.printText = function (text) {
	text.forEach(line => thermal_printer.println(line));

	printer.printDirect({
		data: thermal_printer.getBuffer(),
		printer: epson.name,
		type: "TEXT",
		success: function (job_id) {
			console.log(`Printing OK: ${job_id}`)
		},
		error: function (err) {
			console.log(err)
		}
	});

	thermal_printer.clear();
};
