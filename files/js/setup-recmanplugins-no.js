// To develop locally, first enable the "For Development Only" code on line 243

'use strict';

/**
 * Singleton with "register" functionality.
 *
 * @see http://codereview.stackexchange.com/questions/15166/best-way-to-organize-javascript-for-website
 */

(function(exports) {

	'use strict';

	var initialized,
		registry = []; // Collection of module.

	// Adds module to collection:
	exports.register = function(moduleDeclaration) {

		registry.push(moduleDeclaration); // Add module to registry.

		if (initialized) {

			// If lib already initialized, register and execute module immediately:
			moduleDeclaration.call(this);

		}

	};

	// Executes every module:
	exports.init = function() {

		initialized = true; // Flippin' switches!

		// Loop through each module and execute:
		for (var i = 0, l = registry.length; i < l; i++) {

			registry[i].call(this); // Call and execute module.

		}

	};

}(window.GHB = window.GHB || {})); // Use existing namespace or make a new object of that namespace.

$(document).ready(function() {

	if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {

		// Do something in Chrome
		console.info('You are using Google Chrome, so RAMP really LIKES you! :D');

		$('.browser-is-chrome').fadeIn();

		// // The passphrase used to repeatably generate this RSA key.
		// var zeroWingPassPhrase = 'All your base are belong to us';

		// var facebookAccountKitRSAkey = cryptico.generateRSAKey(zeroWingPassPhrase, 1024);

		// var facebookAccountKitPublicKeyString = cryptico.publicKeyString(facebookAccountKitRSAkey);

		// var facebookAccountKitResponseState;

		// // Initialize Account Kit with CSRF protection
		// AccountKit_OnInteractive = function() {

		//     AccountKit.init({
		//         appId: 509532512575553,
		//         state: facebookAccountKitPublicKeyString,
		//         version: 'v1.0'
		//     });

		// };

		var extension_id;
		var extension_name;
		var extension_url;

		var firebase_extension_ref;

		var apiKey;

		var corporations_info;
		var departments_info;
		var coworkers_info;

		var selected_corporation_id;
		var selected_corporation_name;

		var selected_department_id;
		var selected_department_name;
		var selected_department_employee_count;

		var selected_employeee_id;
		var selected_employeee_name;
		var selected_employee_email;

		var countryData;
		var country_code;
		var ph_num;

		var intercom_company_exists;
		var intercom_company_account_manager_id;
		var intercom_company_account_manager_name;
		var intercom_company_account_manager_email;
		var intercom_company_account_manager_phone;

		var intercom_user_exists;
		var intercom_user_id;

		var now;
		var selected_employee_national_phone;
		var selected_employee_international_phone;

		var licence_per_month = 310;
		var price_per_user;
		var total_price_per_month;
		var subscription_plan;

		var tier_one;
		var tier_two;
		var tier_three;
		var tier_four;

		var tier_one_price_per_user = 89;
		var tier_two_price_per_user = 79;
		var tier_three_price_per_user = 69;
		var tier_four_price_per_user = 59;



		// var PassPhrase;
		// var MattsRSAkey;
		// var MattsPublicKeyString;
		// var generate_RSA_key;

		function is_extension_installed() {

			var hasExtension = false;

			chrome.runtime.sendMessage(extension_id, {

				message: 'is_extension_installed',
				extension_id: extension_id

			}, function(reply) {

				if (reply) {

					if (reply.is_extension_installed) {

						if (reply.is_extension_installed === 'yes') {

							hasExtension = true;

							//console.log(hasExtension);

							if (hasExtension === true) {

								console.info('Extension with ID ' + extension_id + ' is installed. Move along... Move along!');

								next_tab();

							}

						}

					}

				} else {

					var chrome_install_url = 'https://chrome.google.com/webstore/detail/' + extension_id;

					console.log(chrome_install_url);

					$('head').append('<link rel="chrome-webstore-item" href="' + chrome_install_url + '">');

					$('.extension.active .thumbnail').each(function(index) {

						$(this).removeClass('selected');

					});

					$('#step1').find('.extension-not-installed').find('.extension-name').each(function(index) {

						$('#step1 .extension-not-installed .extension-name').text(extension_name);

					});

					$('#step1').find('.extension-not-installed').find('.btn-install-extension').text('Install the ' + extension_name + ' extension');

					$('#step1').find('.extension-not-installed').find('a').each(function(index) {

						$(this).on("click", function(event) {

							event.preventDefault();

							console.log('click')

							console.log('Installation initialized...');

							chrome.webstore.install(chrome_install_url,
								function() {

									//  Success!

									next_tab();

									console.log('Installation succeeded...');

								},
								function(err) {

									//  Error :(

									console.log('Installation failed miserably... :( ' + err);

								});

						});

					});

					$('.extension-not-installed').fadeIn();

					console.warn('These aren\'t the droids you\'re looking for...');

				}

			});

		}

		$('.extension.active .thumbnail').click(function(e) {

			$(this).addClass('selected');

			if ($(this).hasClass('ext_in_old')) {

				if (document.location.hostname == 'localhost') {

					extension_id = 'chmjgifikhlnpdcjjcolkgjcncdapnpm';

				} else {

					extension_id = 'oddoagkaepkbfhejgbahefpeoipmdkkg';

				}

				extension_name = $(this).closest('.extension').find('h6').text();

				firebase_extension_ref = new Firebase('https://ramphq.firebaseio.com/' + extension_name + '/companies/');

				console.log('Chosen extension is ' + extension_name + ' and extension_id = ' + extension_id);

				is_extension_installed();

			} else if ($(this).hasClass('ext_in_new')) {

				if (document.location.hostname == 'localhost') {

					extension_id = 'kpadoefjpmopgglfjbkicgmeeidhbhgg';

				} else {

					// Do not touch this!!!
					extension_id = 'mjliibefpmafaihffaaokeaphalcjgcb';

				}

				extension_name = $(this).closest('.extension').find('h6').text();

				firebase_extension_ref = new Firebase('https://ramphq.firebaseio.com/' + extension_name + '/companies/');

				console.log('Chosen extension is ' + extension_name + ' and extension_id = ' + extension_id);

				is_extension_installed();

			}

		});

		$('.ext_ramp_beta').click(function(e) {

			$(this).addClass('selected');
			console.log('hey hey hey');

			if (document.location.hostname == 'localhost') {

				extension_id = 'gkhedchbbfgjkoclggkgjlnhljlkdnha';

			} else {

				extension_id = 'mkdnlekgafnipgpmojfpilkjgffccdnj';

			}

			extension_name = 'RAMP Beta';

			firebase_extension_ref = new Firebase('https://ramphq.firebaseio.com/' + extension_name + '/companies/');

			console.log('Chosen extension is ' + extension_name + ' and extension_id = ' + extension_id);

			is_extension_installed();


		});

		function reset_validation_icons() {

			$('#step2 .dialog-info .permissions li').each(function() {

				$(this)
					.removeClass('invalid')
					.removeClass('valid')
					.find('.material-icons')
					.text('import_export');
			});

			$('#step2 .dialog-info .permissions li .response small').each(function() {

				$(this).text('');

			});

		};

		function validate_api() {

			// Declare "apiKey"
			apiKey = $('#apiKey').val();

			// Declare "validPermissions"
			var validPermissions = 0;

			if (!$('#apiKey').val()) {

				//console.log('fubar');

				$('#apiKey').closest('.form-group').addClass('has-feedback has-error');

				$('#apiKey').closest('.form-group').find('.form-control-feedback').addClass('invalid-icon').show();

				$('#apiKey').closest('.form-group').find('.help-block').text('The API-key is required.').fadeIn();

				reset_validation_icons();


			} else {

				//apiKey = $('#apiKey').val();

				//console.log(apiKey);

				// Declare basic settings for the API-url
				var apiBaseUrl = 'https://api.recman.no/';
				var getURL = 'v1.php';
				var postURL = 'post/';

				// Set corporation spesific API-url details
				var apiCorporationScope = 'corporation'
				var apiCorporationFields = 'name';

				var apiUrl = apiBaseUrl + getURL + '?key=' + apiKey + '&type=json&scope=' + apiCorporationScope + '&fields=' + apiCorporationFields;

				$.ajax({
					url: apiUrl,
					method: 'GET',
					dataType: 'json',
					error: function(jqXHR, textStatus, errorThrown) {

						// Default error
						//console.debug(jqXHR);
						//console.debug(textStatus);
						//console.debug(errorThrown);

						$('#apiKey').closest('.form-group').addClass('has-feedback has-error');

						$('#apiKey').closest('.form-group').find('.form-control-feedback').addClass('invalid-icon').show();

						$('#apiKey').closest('.form-group').find('.help-block').text('There was a problem while connecting to Recruitment Manager. Please try again.').fadeIn();

						reset_validation_icons();

					},
					success: function(data, textStatus, jqXHR) {

						if (data.error) {

							//console.error(data.error);

							var stringifiedError = JSON.stringify(data)

							if (stringifiedError.indexOf('Key required') !== -1) {

								// No API-key present
								//console.error('Error code: ' + data.error.code);

								//console.error('Error message: ' + data.error.message);

								$('#apiKey').closest('.form-group').addClass('has-feedback has-error');

								$('#apiKey').closest('.form-group').find('.form-control-feedback').addClass('invalid-icon').show();

								$('#apiKey').closest('.form-group').find('.help-block').text('The API-key is required.').fadeIn();

								reset_validation_icons();

							} else if (stringifiedError.indexOf('Invalid key') !== -1) {

								// Invalid API-key
								//console.error('Error code: ' + data.error.code);

								//console.error('Error message: ' + data.error.message);

								$('#apiKey').closest('.form-group').addClass('has-feedback has-error');

								$('#apiKey').closest('.form-group').find('.form-control-feedback').addClass('invalid-icon').show();

								$('#apiKey').closest('.form-group').find('.help-block').text('Your API-key is invalid.').fadeIn();

								reset_validation_icons();

							} else if (data.success === false) {

								// API-key checks out, now validate_api_permissions();
								//console.log('data.success === false');

								check_if_validation_is_done();

							}

						} else {

							// API-key checks out, now validate_api_permissions();
							//console.log('NOT data.error');

							check_if_validation_is_done();

						}

					},

					timeout: 30000

				});

			}

			function validate_api_permissions() {

				apiKey = $('#apiKey').val();

				// console.log(apiKey);

				// Declare basic settings for the API-url
				var apiBaseUrl = 'https://api.recman.no/';
				var getURL = 'v1.php';
				var postURL = 'post/';

				function candidates_api_acess() {
					// Set candidates spesific API-url details
					var apiCandidatesScope = 'candidate_list'
					var apiCandidatesFields = 'firstName';

					var apiUrl = apiBaseUrl + getURL + '?key=' + apiKey + '&type=json&scope=' + apiCandidatesScope + '&fields=' + apiCandidatesFields;

					$.ajax({
						url: apiUrl,
						method: 'GET',
						dataType: 'json',
						error: function(jqXHR, textStatus, errorThrown) {

							// Default error
							//console.debug(jqXHR);
							//console.debug(textStatus);
							//console.debug(errorThrown);

							$('#apiKey').closest('.form-group').addClass('has-feedback has-error');

							$('#apiKey').closest('.form-group').find('.form-control-feedback').addClass('invalid-icon').show();

							$('#apiKey').closest('.form-group').find('.help-block').text('There was a problem while connecting to Recruitment Manager. Please try again.').fadeIn();

						},
						success: function(data, textStatus, jqXHR) {

							// Default error
							//console.debug(data);
							//console.debug(textStatus);
							//console.debug(jqXHR);

							if (data.error) {

								//console.log('data.error');

								//console.error(data.error);

								//$('#step2 .notifications .bg-danger').fadeIn().find('span').text('Your API-key has insufficient permissions.');

								$('#step2 .dialog-info .candidates')
									.removeClass('valid')
									.addClass('invalid')
									.find('.material-icons')
									.text('warning');

								$('#step2 .dialog-info .candidates .response small')
									.text(' Your API-key needs access to this module.');

								$('#apiKey')
									.closest('.form-group')
									.addClass('has-feedback has-error');

								$('#apiKey')
									.closest('.form-group')
									.find('.form-control-feedback')
									.addClass('invalid-icon')
									.show();

								$('#apiKey')
									.closest('.form-group')
									.find('.help-block')
									.text('Your API-key has insufficient permissions. See details above.')
									.fadeIn();

								//$('.wizard .nav-tabs li.active').next().addClass('disabled');

							} else {

								$('#step2 .dialog-info .candidates')
									.removeClass('invalid')
									.addClass('valid')
									.find('.material-icons')
									.text('check');

								$('#step2 .dialog-info .candidates .response small')
									.text('');

								validPermissions++;

								//console.log(validPermissions);

							}

						},

						// Set error timeout for corporation scope permissions check
						timeout: 30000

					});
				}

				function co_workers_api_acess() {
					// Set co-workers spesific API-url details
					var apiCoWorkersScope = 'user'
					var apiCoWorkersFields = 'first_name,last_name,mobile_phone,email,facebook,department_id,corporation_id';

					var apiUrl = apiBaseUrl + getURL + '?key=' + apiKey + '&type=json&scope=' + apiCoWorkersScope + '&fields=' + apiCoWorkersFields;

					$.ajax({
						url: apiUrl,
						method: 'GET',
						dataType: 'json',
						error: function(jqXHR, textStatus, errorThrown) {

							// Default error
							//console.debug(jqXHR);
							//console.debug(textStatus);
							//console.debug(errorThrown);

							$('#apiKey').closest('.form-group').addClass('has-feedback has-error');

							$('#apiKey').closest('.form-group').find('.form-control-feedback').addClass('invalid-icon').show();

							$('#apiKey').closest('.form-group').find('.help-block').text('There was a problem while connecting to Recruitment Manager. Please try again.').fadeIn();

						},
						success: function(data, textStatus, jqXHR) {

							// Default error
							//console.debug(data);
							//console.debug(textStatus);
							//console.debug(jqXHR);

							if (data.error) {

								//console.log('data.error');

								//console.error(data.error);

								//$('#step2 .notifications .bg-danger').fadeIn().find('span').text('Your API-key has insufficient permissions.');

								$('#step2 .dialog-info .co-workers')
									.removeClass('valid')
									.addClass('invalid')
									.find('.material-icons')
									.text('warning');

								$('#step2 .dialog-info .co-workers .response small')
									.text(' Your API-key needs access to this module.');

								$('#apiKey')
									.closest('.form-group')
									.addClass('has-feedback has-error');

								$('#apiKey')
									.closest('.form-group')
									.find('.form-control-feedback')
									.addClass('invalid-icon')
									.show();

								$('#apiKey')
									.closest('.form-group')
									.find('.help-block')
									.text('Your API-key has insufficient permissions. See details above.')
									.fadeIn();

								//$('.wizard .nav-tabs li.active').next().addClass('disabled');

							} else {

								coworkers_info = data;

								$('#step2 .dialog-info .co-workers')
									.removeClass('invalid')
									.addClass('valid')
									.find('.material-icons')
									.text('check');

								$('#step2 .dialog-info .co-workers .response small')
									.text('');

								validPermissions++;

								//console.log(validPermissions);

							}

						},

						// Set error timeout for corporation scope permissions check
						timeout: 30000

					});
				}

				function corporations_api_acess() {
					// Set corporation spesific API-url details
					var apiCorporationScope = 'corporation'
					var apiCorporationFields = 'name';

					var apiUrl = apiBaseUrl + getURL + '?key=' + apiKey + '&type=json&scope=' + apiCorporationScope + '&fields=' + apiCorporationFields;

					$.ajax({
						url: apiUrl,
						method: 'GET',
						dataType: 'json',
						error: function(jqXHR, textStatus, errorThrown) {

							// Default error
							//console.debug(jqXHR);
							//console.debug(textStatus);
							//console.debug(errorThrown);

							$('#apiKey').closest('.form-group').addClass('has-feedback has-error');

							$('#apiKey').closest('.form-group').find('.form-control-feedback').addClass('invalid-icon').show();

							$('#apiKey').closest('.form-group').find('.help-block').text('There was a problem while connecting to Recruitment Manager. Please try again.').fadeIn();

						},
						success: function(data, textStatus, jqXHR) {

							// Default error
							//console.debug(data);
							//console.debug(textStatus);
							//console.debug(jqXHR);

							if (data.error) {

								//console.log('data.error');

								//console.error(data.error);

								//$('#step2 .notifications .bg-danger').fadeIn().find('span').text('Your API-key has insufficient permissions.');

								$('#step2 .dialog-info .corporations')
									.removeClass('valid')
									.addClass('invalid')
									.find('.material-icons')
									.text('warning');

								$('#step2 .dialog-info .corporations .response small')
									.text(' Your API-key needs access to this module.');

								$('#apiKey')
									.closest('.form-group')
									.addClass('has-feedback has-error');

								$('#apiKey')
									.closest('.form-group')
									.find('.form-control-feedback')
									.addClass('invalid-icon')
									.show();

								$('#apiKey')
									.closest('.form-group')
									.find('.help-block')
									.text('Your API-key has insufficient permissions. See details above.')
									.fadeIn();

								//$('.wizard .nav-tabs li.active').next().addClass('disabled');

							} else {

								corporations_info = data;

								$('#step2 .dialog-info .corporations')
									.removeClass('invalid')
									.addClass('valid')
									.find('.material-icons')
									.text('check');

								$('#step2 .dialog-info .corporations .response small')
									.text('');

								validPermissions++;

								//console.log(validPermissions);

							}

						},

						// Set error timeout for corporation scope permissions check
						timeout: 30000

					});
				}

				function departments_api_acess() {
					// Set departments spesific API-url details
					var apiDepartmentsScope = 'department'
					var apiDepartmentsFields = 'name,corporation_id,phone,email,';

					var apiUrl = apiBaseUrl + getURL + '?key=' + apiKey + '&type=json&scope=' + apiDepartmentsScope + '&fields=' + apiDepartmentsFields;

					$.ajax({
						url: apiUrl,
						method: 'GET',
						dataType: 'json',
						error: function(jqXHR, textStatus, errorThrown) {

							// Default error
							//console.debug(jqXHR);
							//console.debug(textStatus);
							//console.debug(errorThrown);

							$('#apiKey').closest('.form-group').addClass('has-feedback has-error');

							$('#apiKey').closest('.form-group').find('.form-control-feedback').addClass('invalid-icon').show();

							$('#apiKey').closest('.form-group').find('.help-block').text('There was a problem while connecting to Recruitment Manager. Please try again.').fadeIn();

						},
						success: function(data, textStatus, jqXHR) {

							// Default error
							//console.debug(data);
							//console.debug(textStatus);
							//console.debug(jqXHR);

							if (data.error) {

								//console.log('data.error');

								//console.error(data.error);

								//$('#step2 .notifications .bg-danger').fadeIn().find('span').text('Your API-key has insufficient permissions.');

								$('#step2 .dialog-info .departments')
									.removeClass('valid')
									.addClass('invalid')
									.find('.material-icons')
									.text('warning');

								$('#step2 .dialog-info .departments .response small')
									.text(' Your API-key needs access to this module.');

								$('#apiKey')
									.closest('.form-group')
									.addClass('has-feedback has-error');

								$('#apiKey')
									.closest('.form-group')
									.find('.form-control-feedback')
									.addClass('invalid-icon')
									.show();

								$('#apiKey')
									.closest('.form-group')
									.find('.help-block')
									.text('Your API-key has insufficient permissions. See details above.')
									.fadeIn();

								//$('.wizard .nav-tabs li.active').next().addClass('disabled');

							} else {

								departments_info = data;

								$('#step2 .dialog-info .departments')
									.removeClass('invalid')
									.addClass('valid')
									.find('.material-icons')
									.text('check');

								$('#step2 .dialog-info .departments .response small')
									.text('');

								validPermissions++;

								//console.log(validPermissions);

							}

						},

						// Set error timeout for corporation scope permissions check
						timeout: 30000

					});
				}

				// Call API-permission functions to check module access
				candidates_api_acess();
				co_workers_api_acess();
				corporations_api_acess();
				departments_api_acess();
				//projects_api_acess();

			}

			function check_if_validation_is_done() {
				$.when(validate_api_permissions()).done(function() {
					setTimeout(function() {
						console.log('API-validation and permissions check done!');

						if (validPermissions === 4) {
							console.info('API-module access checks out.');

							function all_permissions_a_ok() {
								$('#apiKey')
									.closest('.form-group')
									.removeClass('has-error')
									.addClass('has-success');

								$('#apiKey')
									.closest('.form-group')
									.find('.form-control-feedback')
									.removeClass('invalid-icon')
									.addClass('valid-icon')
									.show();

								$('#apiKey')
									.closest('.form-group')
									.find('.help-block')
									.text('')
									.fadeIn();
							}

							$.when(all_permissions_a_ok())
								.done(function() {

									setTimeout(function() {

										next_tab();

										fbq('trackCustom', 'InitiateCheckout');

										$.map(corporations_info, function(obj) {

											obj.id = obj.id || obj.corporation_id; // replace pk with your identifier

											$('#corporationName').append($("<option></option>").attr("value", obj.id).text(obj.name));

											return obj;

										});

										$('#extensionSetup')
											.find('[name="corporationName"]')
											.select2({

												dropdownCssClass: 'dropdown-inverse',
												placeholder: 'Select your Corporation',
												minimumResultsForSearch: 5

											})
											.on("change", function(e) {

												selected_corporation_id = $('#corporationName').select2('data').id;
												selected_corporation_name = $('#corporationName').select2('data').text;

												//var selected_department = $('#departmentName').select2('data').id;

												var departments_data = $.map(departments_info, function(obj) {

													if (obj.corporation_id === selected_corporation_id) {

														return obj;

													}

												});

												if (!departments_data.length) {

													//console.info('YES!');

													console.warn('This corporation has no departments.');

													$('#extensionSetup')
														.find('[name="departmentName"]')
														.closest('.form-group')
														.removeClass('has-success')
														.addClass('has-error');

													$('#extensionSetup')
														.find('[name="departmentName"]')
														.closest('.form-group')
														.find('.form-control-feedback')
														.removeClass('valid-icon')
														.addClass('invalid-icon');

													$('#extensionSetup')
														.find('[name="departmentName"]')
														.closest('.form-group')
														.find('.help-block')
														.attr("data-fv-result", "INVALID");

													$.when($('.container-for-departmentName').fadeOut()).done(function() {

														$('#step3')
															.find('.dialog-warning.departments')
															.fadeIn()
															.find('.corporationName')
															.text(selected_corporation_name);

														$('#step3')
															.find('.next-step')
															.addClass('reload')
															.text('Reload');

														$('#extensionSetup')
															.find('[name="departmentName"]')
															.select2("enable", false);

													});

												} else {

													//console.warn('FUBAR!');

													$('#extensionSetup')
														.find('[name="departmentName"]')
														.closest('.form-group')
														.removeClass('has-error');

													$('#extensionSetup')
														.find('[name="departmentName"]')
														.closest('.form-group')
														.find('.form-control-feedback')
														.removeClass('invalid-icon');

													$('#extensionSetup')
														.find('[name="departmentName"]')
														.closest('.form-group')
														.find('.help-block')
														.attr("data-fv-result", "");

													$.when($('#step3').find('.dialog-warning.departments').fadeOut()).done(function() {

														$.when($('#extensionSetup')
															.find('[name="departmentName"]')
															.select2('data', null)
															.find('option')
															.each(function() {

																if ($(this).val() === '') {

																	// Do nothing to keep first option intact

																} else {

																	$(this).remove();
																}

															})).done(function() {

															$('#step3')
																.find('.next-step')
																.removeClass('reload')
																.text('Save and Continue');

															$.map(departments_data, function(obj) {

																obj.id = obj.id || obj.department_id; // replace pk with your identifier

																$('#departmentName').append($("<option></option>").attr("value", obj.id).text(obj.name));

																return obj;

															});

															$('#extensionSetup')
																.find('[name="departmentName"]')
																.select2("enable", true);

															$('.container-for-departmentName').fadeIn();

														});

													});

												}

											})
											.end()
											.find('[name="departmentName"]')
											.select2({

												dropdownCssClass: 'dropdown-inverse',
												placeholder: 'Select your Department',
												minimumResultsForSearch: 5

											})
											.on("change", function(e) {

												selected_department_id = $('#departmentName').select2('data').id;
												selected_department_name = $('#departmentName').select2('data').text;

												//console.log(selected_department_id);

												var coworkers_data = '';

												coworkers_data = $.map(coworkers_info, function(obj) {

													if (obj.department_id === selected_department_id) {

														if (obj.email.indexOf('demonstrasjonsbruker.no') != -1) {

															console.log('Fake user detected: ' + obj.email);

														} else if (obj.email.indexOf('support@recman.no') != -1) {

															console.log('Fake user detected: ' + obj.email);

														} else {

															console.log(obj.email);

															return obj;

														}

													}

												});

												//console.log(coworkers_data);

												if (!coworkers_data.length) {

													console.warn('This Department has no employees');

													$('#extensionSetup')
														.find('[name="employeeName"]')
														.closest('.form-group')
														.removeClass('has-success')
														.addClass('has-error');

													$('#extensionSetup')
														.find('[name="employeeName"]')
														.closest('.form-group')
														.find('.form-control-feedback')
														.removeClass('valid-icon')
														.addClass('invalid-icon');

													$('#extensionSetup')
														.find('[name="employeeName"]')
														.closest('.form-group')
														.find('.help-block')
														.attr("data-fv-result", "INVALID");

													$('#step3')
														.find('.dialog-warning.employees')
														.fadeIn()
														.find('.departmentName')
														.text(selected_department_name);

													$('#step3')
														.find('.next-step')
														.addClass('reload')
														.text('Reload');

													$('#extensionSetup')
														.find('[name="employeeName"]')
														.select2("enable", false);



												} else {

													$('#extensionSetup')
														.find('[name="employeeName"]')
														.closest('.form-group')
														.removeClass('has-error');

													$('#extensionSetup')
														.find('[name="employeeName"]')
														.closest('.form-group')
														.find('.form-control-feedback')
														.removeClass('invalid-icon');

													$('#extensionSetup')
														.find('[name="employeeName"]')
														.closest('.form-group')
														.find('.help-block')
														.attr("data-fv-result", "");

													$.when($('#step3')
														.find('.dialog-warning.employees')
														.fadeOut()).done(function() {

														$.when($('#extensionSetup')
															.find('[name="employeeName"]')
															.select2('data', null)
															.find('option')
															.each(function() {

																if ($(this).val() === '') {

																	// Do nothing to keep first option intact

																} else {

																	$(this).remove();
																}

															})).done(function() {

															$('#step3')
																.find('.next-step')
																.removeClass('reload')
																.text('Save and Continue');

															selected_department_employee_count = coworkers_data.length;

															console.log('This department has ' + selected_department_employee_count + ' employees.');

															$('.company-does-not-exists-on-intercom')
																.find('.recman_users')
																.text(selected_department_employee_count);

															calculate_monthly_cost();

															$.map(coworkers_data, function(obj) {

																obj.id = obj.id || obj.user_id; // replace pk with your identifier

																$('#employeeName').append($("<option></option>").attr("value", obj.id).text(obj.first_name + ' ' + obj.last_name));

																return obj;

															});

															$('#extensionSetup')
																.find('[name="employeeName"]')
																.select2("enable", true);

															check_if_company_exists_on_intercom();

														});

													});



												}

											})
											.end()
											.find('[name="employeeName"]')
											.select2({

												dropdownCssClass: 'dropdown-inverse',
												placeholder: 'Find your name',
												minimumResultsForSearch: 1,
												containerCssClass: 'select2-custom-search',
												dropdownCssClass: 'select2-custom-search',
												formatNoMatches: function(term) {
													return '<h6>Attention! We\'ve encountered the following issues:</h6><p>We were Unable to find your name. Please contact your system administrator to get access to Recruitment Manager.</p>';
												}

											})
											.on('select2-opening', function() {

												console.log('opening');

											})
											.on('select2-open', function() {

												$('#extensionSetup')
													.formValidation('updateStatus', 'employeeName', 'NOT_VALIDATED')
													.formValidation('updateStatus', 'coWorkerMobileNumber', 'NOT_VALIDATED')
													.formValidation('updateStatus', 'coWorkerEmail', 'NOT_VALIDATED')
													.end()

												$('#extensionSetup')
													.find('[name="employeeName"]')
													.closest('.tab-pane')
													.find('.NOT_AUTHENTICATED')
													.fadeOut()
													.end()
													.find('[name="employeeName"]')
													.closest('.tab-pane')
													.find('.BAD_PARAMS')
													.fadeOut()

												$('#extensionSetup')
													.find('[name="coWorkerMobileNumber"]')
													.closest('.form-group')
													.find('.country-list')
													.removeClass('hide')
													.addClass('hide')

												$('body')
													.find('.select2-container.select2-custom-search')
													.addClass('in-focus');

												$('body')
													.find('.select2-container.select2-custom-search')
													.find('.select2-choice')
													.find('.select2-arrow')
													.addClass('in-focus');

												$('body')
													.find('.select2-drop.select2-custom-search')
													.find('.select2-search')
													.find('input')
													.attr("placeholder", "Find your name");

												$('body')
													.find('.select2-container.select2-custom-search')
													.find('.select2-choice')
													.find('.select2-chosen')
													.hide();

											})
											.on('select2-select', function() {

												$('body')
													.find('.select2-drop.select2-custom-search')
													.find('.select2-search')
													.find('input')
													.attr("placeholder", "")
													.end()
													.find('.select2-container.select2-custom-search')
													.find('.select2-choice')
													.find('.select2-chosen')
													.show()

											})
											.on('select2-close', function() {

												$('body')
													.find('.select2-container.select2-custom-search')
													.removeClass('in-focus');

												$('body')
													.find('.select2-container.select2-custom-search')
													.find('.select2-choice')
													.find('.select2-arrow')
													.removeClass('in-focus');

												$('body')
													.find('.select2-container.select2-custom-search')
													.find('.select2-choice')
													.find('.select2-chosen')
													.addClass('selected')
													.show();

												console.log('close');

											})
											.on('select2-close', function() {

												$('.select2-custom-search .select2-search input')
													.closest('.input-group')
													.find('.input-group-addon')
													.removeClass('in-focus');

												var selected_employee_data = $('#employeeName').select2('data');

												if (selected_employee_data === null) {

													//alert('No value!')

													$('#extensionSetup')
														.formValidation('revalidateField', 'employeeName');

												} else {

													selected_employeee_id = $('#employeeName').select2('data').id;
													selected_employeee_name = $('#employeeName').select2('data').text;

												}

												var employee_data = $.map(coworkers_info, function(obj) {

													if (obj.user_id === selected_employeee_id) {

														return obj

													}

												});

												console.log(employee_data);

												var employee_mobile_phone = $.map(employee_data, function(obj) {

													return obj.mobile_phone;

												});

												var employee_email = $.map(employee_data, function(obj) {

													return obj.email;

												});

												console.log(employee_mobile_phone);
												console.log(employee_email);

												$.when($('#extensionSetup')
													.find('[name="coWorkerMobileNumber"]')
													.intlTelInput({
														//initialCountry: 'auto',
														// geoIpLookup: function(callback) {
														//     $.get('//ipinfo.io', function() {}, "jsonp").always(function(resp) {
														//         var countryCode = (resp && resp.country) ? resp.country : "";
														//         callback(countryCode);
														//     });
														// },
														utilsScript: './js/vendor/intl-tel-input/utils.js',
														autoFormat: true,
														autoPlaceholder: true,
														preferredCountries: ['no', 'se', 'dk'],
														separateDialCode: true,
														formatOnInit: true

													})).done(function() {

													$.when($('#extensionSetup')
														.find('input[name="coWorkerMobileNumber"]')
														.val(employee_mobile_phone)
														.end()
														.find('input[name="coWorkerEmail"]')
														.val(employee_email)
														// .end()
														// .find('[name="editPhoneNumber"]')
														// .bootstrapSwitch('state', false)
													).done(function() {

														if (!employee_mobile_phone.length) {

															$('#extensionSetup')
																.find('[name="editPhoneNumber"]')
																.bootstrapSwitch('state', true)

															console.log('no number');

														} else {

															$('#extensionSetup')
																.find('input[name="coWorkerMobileNumber"]')
																.val(employee_mobile_phone)
																.end()

															var countryData = $('#coWorkerMobileNumber').intlTelInput("getSelectedCountryData");

															console.log(countryData);

															var iso2 = countryData.iso2;

															console.log(iso2);

															var ntlNumber = $('#coWorkerMobileNumber').intlTelInput("getNumber", intlTelInputUtils.numberFormat.NATIONAL).replace(/\s+/g, '');

															console.log(ntlNumber);

															var formattedNumber = intlTelInputUtils.formatNumber(ntlNumber, iso2, intlTelInputUtils.numberFormat.NATIONAL);

															console.log(formattedNumber);

															$('#extensionSetup')
																.find('input[name="coWorkerMobileNumber"]')
																.val(formattedNumber)
																.end()

															console.log('number a-ok');

														}

														function formatMobileNumber() {

															var countryData = $('#coWorkerMobileNumber').intlTelInput("getSelectedCountryData");

															console.log(countryData);

															var iso2 = countryData.iso2;

															console.log(iso2);

															var ntlNumber = $('#coWorkerMobileNumber').val();


															console.log(ntlNumber);

															var formattedNumber = intlTelInputUtils.formatNumber(ntlNumber, iso2, intlTelInputUtils.numberFormat.NATIONAL);

															console.log(formattedNumber);

															$('#coWorkerMobileNumber').val(formattedNumber);

														};


														$('#coWorkerMobileNumber').blur(function() {

															formatMobileNumber();

														});

														if (selected_employeee_name.length) {

															//check_if_user_exsists_in_company_on_intercom()

															$('#extensionSetup').find('[wrapper-for="employee-phone-number"]').fadeIn()

														}

													})

												});

											})
											.end()
											.on('click', '.country-list', function() {

												$('#extensionSetup').formValidation('revalidateField', 'coWorkerMobileNumber');

											})
											.on('init.field.fv', function(e, data) {
												// $(e.target)  --> The field element
												// data.fv      --> The FormValidation instance
												// data.field   --> The field name
												// data.element --> The field element

												var $parent = data.element.parents('.input-group'),
													$icon = data.element.data('fv.icon'),
													$wrapper = $parent.find('.material-icons');

												// Place the icon right after the label
												$icon.insertBefore($wrapper);
											})
											.formValidation({
												framework: 'bootstrap',
												excluded: ':disabled',
												icon: {

													valid: 'material-icons valid-icon',
													invalid: 'material-icons invalid-icon',
													validating: 'material-icons validating-icon'

												},
												fields: {
													corporationName: {

														validators: {

															callback: {

																callback: function(value, validator, $field) {

																	if (value === '') {

																		return {

																			valid: false,
																			message: 'Please select the corporation you are associated with.',

																		};

																	}

																	return {

																		valid: true,

																	};

																}
															}

														},
														// onSuccess: function(e, data) {
														//     // data.fv is the plugin instance

														//     if (!data.fv.isValidField('departmentName')) {
														//         // Revalidate it
														//         data.fv.revalidateField('departmentName');
														//     }

														// }

													},
													departmentName: {

														validators: {

															callback: {

																callback: function(value, validator, $field) {

																	if (value === '') {

																		return {

																			valid: false,
																			message: 'Please select the department you are associated with.',

																		};

																	}

																	return {

																		valid: true,

																	};

																}
															}

														},
														// onSuccess: function(e, data) {
														//     // data.fv is the plugin instance

														//     if (!data.fv.isValidField('corporationName')) {
														//         // Revalidate it
														//         data.fv.revalidateField('corporationName');
														//     }

														// }

													},
													employeeName: {

														validators: {

															callback: {

																callback: function(value, validator, $field) {

																	if (value === '') {

																		return {

																			valid: false,
																			message: 'Please provide your name.',

																		};

																	}

																	return {

																		valid: true,

																	};

																}
															}

														}

													},
													coWorkerMobileNumber: {
														//row: '.input-group',
														validators: {
															notEmpty: {
																message: 'Please provide your phone number.'
															},
															// callback: {
															//     message: 'Your mobile phone number is not valid',
															//     callback: function(value, validator, $field) {
															//         return value === '' || $field.intlTelInput('isValidNumber');
															//     }

															// }
															callback: {
																callback: function(value, validator, $field) {
																	var isValid = value === '' || $field.intlTelInput('isValidNumber'),
																		err = $field.intlTelInput('getValidationError'),
																		message = null;
																	switch (err) {
																		case intlTelInputUtils.validationError.INVALID_COUNTRY_CODE:
																			message = 'The country code is not valid';
																			break;

																		case intlTelInputUtils.validationError.TOO_SHORT:
																			message = 'The phone number is too short';
																			break;

																		case intlTelInputUtils.validationError.TOO_LONG:
																			message = 'The phone number is too long';
																			break;

																		case intlTelInputUtils.validationError.NOT_A_NUMBER:
																			message = 'The value is not a number';
																			break;

																		default:
																			message = 'The phone number is not valid';
																			break;
																	}

																	return {
																		valid: isValid,
																		type: $field.intlTelInput('getNumberType'),
																		message: message
																	};
																}
															}

														}

													},

													coWorkerEmail: {
														//row: '.input-group',
														// onError: function(e, data) {
														//     // Do something ...
														// },
														validators: {

															notEmpty: {

																message: 'Please provide your email address.'

															},
															emailAddress: {

																message: 'The value is not a valid email address'

															},
															regexp: {

																regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
																message: 'The value is not a valid email address'

															}

														}

													},

													agree: {
														excluded: false,
														validators: {
															callback: {
																message: 'You must agree to our Terms of Service before you can create your account.',
																callback: function(value, validator, $field) {
																	return value === 'yes';
																}
															}
														}
													}

												}

											})
											.on('status.field.fv', function(e, data) {
												// data.field     --> The field name
												// data.element   --> The field element
												// data.result    --> The result returned by the validator
												// data.validator --> The validator name

												var $element = data.element;
												var $icon = $element.data('fv.icon');

												if (data.field === 'coWorkerMobileNumber') {

													switch (data.status) {

														case 'VALID':
															$icon.html('phone_iphone');
															break;

														case 'INVALID':
															$icon.html('phone_iphone');
															break;

													}

												}

												if (data.field === 'coWorkerEmail') {

													switch (data.status) {

														case 'VALID':
															$icon.html('mail');
															break;

														case 'INVALID':
															$icon.html('mail');
															break;

													}

												}

											})
											// This event will be triggered when the field passes given validator
											.on('success.validator.fv', function(e, data) {
												// data.field     --> The field name
												// data.element   --> The field element
												// data.result    --> The result returned by the validator
												// data.validator --> The validator name

												//$('#extensionSetup').formValidation('revalidateField', 'departmentName');

												var step_4_validated;

												if (data.field === 'corporationName') {

													var select2_field_value = $('#extensionSetup')
														.find('[name="departmentName"]')
														.select2('data');

													if (select2_field_value === null) {

														$('#extensionSetup')
															.find('[name="departmentName"]')
															.closest('.form-group')
															.removeClass('has-success')
															.addClass('has-warning')

														if ($('#extensionSetup')
															.find('[name="departmentName"]')
															.closest('.form-group')
															.hasClass('has-warning')) {

															$('#extensionSetup')
																.formValidation(

																	'updateStatus',
																	'departmentName',
																	'NOT_VALIDATED'

																)

														}

													}

													$('#step3')
														.find('.dialog-warning.employees')
														.fadeOut()

												} else if (data.field === 'coWorkerMobileNumber' && data.validator === 'callback' && data.element.val() !== '') {

													if (data.result.type !== intlTelInputUtils.numberType.MOBILE) {

														data.fv
															// Mark the field as invalid
															.updateStatus('coWorkerMobileNumber', 'INVALID', 'callback')
															// Update the message
															.updateMessage('coWorkerMobileNumber', 'callback', 'We only accept mobile numbers');

													} else {

														// Reset the message
														data.fv.updateMessage('coWorkerMobileNumber', 'callback', 'The phone number is not valid');

													}

												}

												// else if (data.field === 'employeeName') {

												//     step_4_validated = true

												// } else if (data.field === 'coWorkerMobileNumber') {

												//     step_4_validated

												// } else if (data.field === 'coWorkerEmail') {

												//     step_4_validated = true

												// }



												// var $tabPane = data.element.parents('.tab-pane');
												// var isValidTab = data.fv.isValidContainer($tabPane);

												// if ($tabPane.is('#step4')) {

												//     console.log('This is Tab 4');

												//     if (isValidTab !== null) {

												//         // Do nothing if invalid

												//     } else {

												//         console.log('Tab 4 is valid');

												//     }

												// }

											})
											// This event will be triggered when the field doesn't pass given validator
											.on('err.validator.fv', function(e, data) {
												// data.bv        --> The FormValidation.Base instance
												// data.field     --> The field name
												// data.element   --> The field element
												// data.validator --> The current validator name

												if (data.field === 'coWorkerEmail') {
													// The email field is not valid
													data.element
														.data('fv.messages')
														// Hide all the messages
														.find('.help-block[data-fv-for="' + data.field + '"]').hide()
														// Show only message associated with current validator
														.filter('[data-fv-validator="' + data.validator + '"]').show();
												}
											})
											.bootstrapWizard({
												tabClass: 'nav nav-tabs',
												onTabClick: function(tab, navigation, index) {
													return validateTab(index);
												},
												onNext: function(tab, navigation, index) {
													var numTabs = $('#extensionSetup').find('.tab-pane').length,
														isValidTab = validateTab(index - 1);
													if (!isValidTab) {
														return false;
													}

													if (index === numTabs) {
														// We are at the last tab

														// Uncomment the following line to submit the form using the defaultSubmit() method
														// $('#extensionSetup').formValidation('defaultSubmit');

														// For testing purpose
														$('#completeModal').modal();
													}

													return true;
												},
												onPrevious: function(tab, navigation, index) {
													return validateTab(index + 1);
												},
												onTabShow: function(tab, navigation, index) {
													// Update the label of Next button when we are at the last tab
													var numTabs = $('#extensionSetup').find('.tab-pane').length;
													$('#extensionSetup')
														.find('.next-step ')
														.removeClass('disabled') // Enable the Next button
														.find('a')
														.html(index === numTabs - 1 ? 'Install' : 'Next');
												}
											});

										function validateTab(index) {
											var fv = $('#extensionSetup').data('formValidation'), // FormValidation instance
												// The current tab
												$tab = $('#extensionSetup').find('.tab-pane').eq(index);

											// Validate the container
											fv.validateContainer($tab);

											var isValidStep = fv.isValidContainer($tab);

											if (isValidStep === false || isValidStep === null) {

												// Do not jump to the target tab
												return false;

											}

											return true;

										}

									}, 500);

								});

						} else {

							console.warn('API-permissions missing....');



						}

					}, 750);

				});

			}

		}

		function calculate_monthly_cost() {

			// Calculate monthly cost
			var recman_coworkers = selected_department_employee_count;

			licence_per_month = 310;
			price_per_user = 0;
			total_price_per_month = 0;
			subscription_plan = '';

			tier_one = 0;
			tier_two = 0;
			tier_three = 0;
			tier_four = 0;

			tier_one_price_per_user = 89;
			tier_two_price_per_user = 79;
			tier_three_price_per_user = 69;
			tier_four_price_per_user = 59;

			if (recman_coworkers >= 0 && recman_coworkers <= 1) {
				subscription_plan = 'Essential';
				console.log(subscription_plan);
			} else if (recman_coworkers >= 2 && recman_coworkers <= 5) {
				subscription_plan = 'Team';
				console.log(subscription_plan);
			} else if (recman_coworkers >= 6 && recman_coworkers <= 25) {
				subscription_plan = 'Professional';
				console.log(subscription_plan);
			} else if (recman_coworkers >= 26) {
				subscription_plan = 'Enterprise';
				console.log(subscription_plan);
			}

			if (recman_coworkers >= 0 && recman_coworkers <= 1) {

				tier_one = tier_one_price_per_user * recman_coworkers;

				total_price_per_month = licence_per_month + tier_one;

				console.log(total_price_per_month);

				$('.monthly_cost').find('.price').text(total_price_per_month);

			}

			if (recman_coworkers >= 2 && recman_coworkers <= 5) {

				tier_one = (1 * tier_one_price_per_user) + licence_per_month;
				console.log(tier_one);

				tier_two = ((recman_coworkers - 1) * tier_two_price_per_user);
				console.log(tier_two);

				total_price_per_month = tier_one + tier_two;

				console.log(total_price_per_month);

				$('.monthly_cost').find('.price').text(total_price_per_month);

			}

			if (recman_coworkers >= 6 && recman_coworkers <= 25) {

				tier_one = (1 * tier_one_price_per_user) + licence_per_month;
				console.log(tier_one);

				tier_two = ((5 - 1) * tier_two_price_per_user);
				console.log(tier_two);

				tier_three = ((recman_coworkers - 5) * tier_three_price_per_user);
				console.log(tier_three);

				total_price_per_month = tier_one + tier_two + tier_three;

				console.log(total_price_per_month);

				$('.monthly_cost').find('.price').text(total_price_per_month);

			}

			if (recman_coworkers >= 26) {

				tier_one = (1 * tier_one_price_per_user) + licence_per_month;
				console.log(tier_one);

				tier_two = ((5 - 1) * tier_two_price_per_user);
				console.log(tier_two);

				tier_three = ((25 - 5) * tier_three_price_per_user);
				console.log(tier_three);

				tier_four = ((recman_coworkers - 25) * tier_four_price_per_user);
				console.log(tier_four);

				total_price_per_month = tier_one + tier_two + tier_three + tier_four;

				if (total_price_per_month <= 3999) {
					total_price_per_month = total_price_per_month;
					console.log(total_price_per_month);
					$('.monthly_cost').find('.price').text(total_price_per_month);
				} else {
					total_price_per_month = 3999;
					console.log(total_price_per_month);
					$('.monthly_cost').find('.price').text(total_price_per_month);
				}
			}

		}

		window.Intercom('shutdown');

		window.Intercom('boot', {
			app_id: 'uiel53cc',
			widget: {
				activator: '#IntercomDefaultWidget'
			}
		});

		function check_if_company_exists_on_intercom() {

			firebase_extension_ref.child(selected_department_id).on('value', function(snapshot) {

				var firebase_company = snapshot.val();

				if (firebase_company !== null && firebase_company.length !== 0) {

					var firebase_company_id = firebase_company.company_id;

					if (selected_department_id === firebase_company_id) {

						console.warn('Warning! The company ' + selected_department_name + ' exists on Firebase.');

						//console.log(firebase_company);
						//console.log(firebase_company.account_manager);

						var firebase_account_manager = firebase_company.account_manager;

						intercom_company_account_manager_id = firebase_account_manager.account_manager_id;
						intercom_company_account_manager_name = firebase_account_manager.account_manager_name;
						intercom_company_account_manager_email = firebase_account_manager.account_manager_email;
						intercom_company_account_manager_phone = firebase_account_manager.account_manager_phone;

						intercom_company_exists = true;

					}

				}

			});

			console.log('The selected department has ' + selected_department_employee_count + ' employees...');

		}

		function next_tab() {

			var $active = $('.wizard .nav-tabs li.active');

			$active.addClass('disabled');

			$active.next().removeClass('disabled');

			nextTab($active);



		}

		function prev_tab() {

			var $active = $('.wizard .nav-tabs li.active');

			$active.addClass('disabled');

			$active.prev().removeClass('disabled');

			prevTab($active);

		}

		$('input').focus(function() {

			$(this).closest('.input-group').find('.input-group-addon').addClass('in-focus');

			$(this).closest('.form-group').find('.form-control-feedback').addClass('in-focus');

		});


		$('input').blur(function() {

			$(this).closest('.input-group').find('.input-group-addon').removeClass('in-focus');

			$(this).closest('.form-group').find('.form-control-feedback').removeClass('in-focus');

		});

		// login callback
		function loginCallback(response) {

			console.log(response);

			$('#extensionSetup')
				.formValidation('updateStatus', 'employeeName', 'NOT_VALIDATED')
				.formValidation('updateStatus', 'coWorkerMobileNumber', 'NOT_VALIDATED')
				.formValidation('updateStatus', 'coWorkerEmail', 'NOT_VALIDATED');

			if (response.status === "PARTIALLY_AUTHENTICATED") {

				//document.getElementById("code").value = response.code;

				//document.getElementById("csrf_nonce").value = response.state;

				console.log(response.code);

				facebookAccountKitResponseState = response.state;

				console.log(facebookAccountKitResponseState);

				console.log(facebookAccountKitPublicKeyString);

				if (facebookAccountKitResponseState === facebookAccountKitPublicKeyString) {

					$('.wizard .nav-tabs li.active')
						.prev()
						.addClass('disabled');

					$.when($('#extensionSetup')
						.find('.form-group')
						.removeClass('has-feedback')
						.addClass('disabled')
						.end()
						.find('.form-control')
						.each(function() {

							$(this).prop("disabled", true)

						})

					).done(function() {

						$('#extensionSetup')
							.find('[name="employeeName"]')
							.closest('.tab-pane')
							.find('.NOT_AUTHENTICATED')
							.fadeOut()
							.end()
							.find('[name="employeeName"]')
							.closest('.tab-pane')
							.find('.BAD_PARAMS')
							.fadeOut()
							.end()
							.find('.btn-group-create-account')
							.fadeOut();

					});

					var now = Math.round(new Date().getTime() / 1000);
					selected_employee_email = $('#coWorkerEmail').val();
					var selected_employee_national_phone = $('#coWorkerMobileNumber').val();
					var selected_employee_international_phone = country_code + ' ' + selected_employee_national_phone;

					console.log(now);
					console.log(apiKey);

					console.log(selected_corporation_id);
					console.log(selected_corporation_name);

					console.log(selected_department_id);
					console.log(selected_department_name);

					console.log(selected_employeee_id);
					console.log(selected_employeee_name);
					console.log(selected_employee_email);
					console.log(selected_employee_international_phone);

					if (intercom_company_exists === true) {

						chrome.runtime.sendMessage(extension_id, {

							message: 'activate',
							apiKey: apiKey,
							corporation_id: selected_corporation_id,
							corporation_name: selected_corporation_name,
							department_id: selected_department_id,
							department_name: selected_department_name,
							department_created_at: now,
							intercom_company_account_manager_id: intercom_company_account_manager_id,
							intercom_company_account_manager_name: intercom_company_account_manager_name,
							intercom_company_account_manager_email: intercom_company_account_manager_email,
							intercom_company_account_manager_phone: intercom_company_account_manager_phone,
							intercom_employeee_id: selected_employeee_id,
							intercom_employeee_name: selected_employeee_name,
							intercom_employeee_email: selected_employee_email,
							intercom_employeee_phone: selected_employee_international_phone,
							intercom_employeee_created_at: now



						}, function(response) {

							console.log(response);

							console.log('Response is ' + response.message);

							if (response.message === 'extension_activated') {

								var firebase_user_ref = firebase_extension_ref.child(selected_department_id + '/users/' + selected_employeee_id);

								firebase_user_ref.transaction(function(currentData) {

									if (currentData === null) {

										return {

											email: selected_employee_email,
											user_id: selected_employeee_id,
											created_at: now,
											signed_up_at: now,
											name: selected_employeee_name,
											"phone": selected_employee_international_phone,
											"account_manager": null,
											"extension_activated": true,

										};

									} else {

										console.warn('User ' + selected_employeee_name + ' already exists.');
										return; // Abort the transaction.

									}

								}, function(error, committed, snapshot) {

									if (error) {

										console.error('Transaction failed abnormally!', error);

									} else if (!committed) {

										console.warn('We aborted the transaction (because user ' + selected_employeee_name + ' already exists).');

										$('#extensionSetup').find('[wrapper-for="employee-phone-number"]').hide()
										$('#extensionSetup').find('.btn-group-create-account').hide()
										$('#extensionSetup').find('.btn-group-go-to-subscription').hide()
										$('#extensionSetup').find('.user-exists-on-intercom').fadeIn()
										//$('#extensionSetup').find('.btn-group-user-exists-on-intercom').fadeIn()
										$('#extensionSetup').find('.name-user-exists-on-intercom').text(selected_employeee_name)

										window.Intercom('boot', {
											app_id: 'uiel53cc',
											widget: {
												activator: '#IntercomDefaultWidget'
											}
										});

									} else {

										console.info('A new user named ' + selected_employeee_name + ' was added to ' + selected_department_name + '.');

										window.Intercom('boot', {

											app_id: 'uiel53cc',

											email: selected_employee_email,
											user_id: selected_employeee_id,
											created_at: now,
											signed_up_at: now,
											name: selected_employeee_name,
											"phone": selected_employee_international_phone,
											"account_manager": null,
											"extension_activated": true,

											companies: [{

												// company_id: selected_department_id,
												id: selected_department_id,
												"parent_company_id": selected_corporation_id,
												"department_id": selected_department_id,

											}],

											widget: {

												activator: '#IntercomDefaultWidget'

											}

										});

										$('#extensionSetup')
											.find('[name="employeeName"]')
											.closest('.tab-pane')
											.find('.PARTIALLY_AUTHENTICATED')
											.fadeIn()
											.end()
											.find('[name="employeeName"]')
											.closest('.tab-pane')
											.find('.btn-group-go-to-subscription')
											.fadeIn();

										function show_to_new_user_if_company_exists() {

											$('#complete .intercom_company_name').each(function(index) {

												$(this).text(selected_department_name);

											});

											$('#extensionSetup #complete .intercom_company_account_manager_name').text(intercom_company_account_manager_name);
											$('#extensionSetup #complete .intercom_company_account_manager_phone span').text(intercom_company_account_manager_phone);
											$('#extensionSetup #complete .intercom_company_account_manager_email a').attr('href', 'mailto:' + intercom_company_account_manager_email);
											$('#extensionSetup #complete .intercom_company_account_manager_email a').text(intercom_company_account_manager_email);
											$('#extensionSetup #complete span.extension-name').text(extension_name);
											$('#extensionSetup #complete .company-exists-on-intercom').fadeIn();

											$('h3.header').html('<strong>THANK YOU</strong> FOR SIGNING UP')
											$('#extensionSetup .nav-tabs li.subscription').remove();
											$('#extensionSetup .nav-tabs li').css('width', '16.6666667%');
											$('#extensionSetup #step5').remove();

											//next_tab();

											// fbq('trackCustom', 'Purchase');

										}

										$.when(show_to_new_user_if_company_exists()).done(function() {

											next_tab();

										});

										//show_to_new_user_if_company_exists();

									}

									console.log(selected_employeee_name + "'s data: ", snapshot.val());

								});

							} else {

								console.log('FUBAR!')

							}

						});

					} else {

						firebase_extension_ref.child(selected_department_id).set({

							"company_id": selected_department_id,
							"remote_created_at": now,
							"name": selected_department_name,
							"employee_count": selected_department_employee_count,
							"api_key": apiKey,
							"plan": null,
							"trial_started_at": null,
							"upgraded_at": null,
							"parent_company": selected_corporation_name,
							"account_manager": {

								"account_manager_id": selected_employeee_id,
								"account_manager_name": selected_employeee_name,
								"account_manager_email": selected_employee_email,
								"account_manager_phone": selected_employee_international_phone

							}

						}, function(error) {

							if (error) {

								console.warn('Company data could not be saved.' + error);

							} else {

								console.log('Company data saved successfully.');

								firebase_extension_ref.child(selected_department_id + '/users/' + selected_employeee_id).set({

									email: selected_employee_email,
									user_id: selected_employeee_id,
									created_at: now,
									signed_up_at: now,
									name: selected_employeee_name,
									"phone": selected_employee_international_phone,
									"account_manager": true,
									"extension_activated": false,

								}, function(error) {

									if (error) {

										console.warn('User data could not be saved.' + error);

									} else {

										console.log('User data saved successfully.');

										window.Intercom('boot', {

											app_id: 'uiel53cc',

											email: selected_employee_email,
											user_id: selected_employeee_id,
											created_at: now,
											signed_up_at: now,
											name: selected_employeee_name,
											"phone": selected_employee_international_phone,
											"account_manager": true,
											"extension_activated": false,

											companies: [{

												// company_id: selected_department_id,
												id: selected_department_id,
												"parent_company_id": selected_corporation_id,
												"department_id": selected_department_id,
												remote_created_at: now,
												name: selected_department_name,
												"employee_count": selected_department_employee_count,
												"api_key": apiKey,
												"parent_company": selected_corporation_name,
												"account_manager_id": selected_employeee_id,
												"account_manager_name": selected_employeee_name,
												"account_manager_email": selected_employee_email,
												"account_manager_phone": selected_employee_international_phone

											}],

											widget: {

												activator: '#IntercomDefaultWidget'

											}

										});

										$('#extensionSetup')
											.find('[name="employeeName"]')
											.closest('.tab-pane')
											.find('.PARTIALLY_AUTHENTICATED')
											.fadeIn()
											.end()
											.find('[name="employeeName"]')
											.closest('.tab-pane')
											.find('.btn-group-go-to-subscription')
											.fadeIn();

										$('#step5')
											.find('.company-does-not-exists-on-intercom')
											.fadeIn()

										next_tab();

										console.info('A new user was created: ' + selected_employeee_name);
										console.info('A new company was created: ' + selected_department_name);

									}

								});

							}

						});

					}

				} else {

					console.warn('Sorry mac...!');

					$.when($('#step4')
						.find('.dialog')
						.fadeOut()).done(function() {
						$('#step4')
							.find('.NOT_AUTHENTICATED')
							.fadeIn()
					})

				}
				//document.getElementById("my_form").submit();

			} else if (response.status === "NOT_AUTHENTICATED") {

				// handle authentication failure

				$.when($('#step4')
					.find('.dialog')
					.fadeOut()).done(function() {
					$('#step4')
						.find('.NOT_AUTHENTICATED')
						.fadeIn()
				})

			} else if (response.status === "BAD_PARAMS") {

				// handle bad parameters

				$.when($('#step4')
					.find('.dialog')
					.fadeOut()).done(function() {
					$('#step4')
						.find('.BAD_PARAMS')
						.fadeIn()
				})

			}
		}

		// phone form submission handler
		function phone_btn_onclick() {

			countryData = $('#coWorkerMobileNumber').intlTelInput("getSelectedCountryData");

			country_code = '+' + countryData.dialCode;

			ph_num = $('#coWorkerMobileNumber').intlTelInput("getNumber", intlTelInputUtils.numberFormat.NATIONAL).replace(/\s+/g, '');

			console.log(country_code + ph_num);

			// var ph_num = document.getElementById("coWorkerMobileNumber").value;

			AccountKit.login('PHONE', {

					countryCode: country_code,
					phoneNumber: ph_num

				}, // will use default values if this is not specified

				loginCallback);

		}

		//Initialize tooltips
		$('.nav-tabs > li a[title]').tooltip();

		//Wizard
		$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

			var $target = $(e.target);

			if ($target.parent().hasClass('disabled')) {

				return false;
			}

		});

		$('.next-step').click(function(e) {

			if ($(this).hasClass('not_validated')) {

				validate_api();

			} else if ($(this).hasClass('reload')) {

				location.reload();

			} else if ($(this).hasClass('step_3')) {

				// $('#employeeName').select2('data', null)
				// $('#coWorkerMobileNumber').val('');
				// $('#coWorkerEmail').val('');

				$('#step4').find('.btn-group-user-exists-on-intercom').hide();
				$('#step4').find('.btn-group-create-account').show();

				$('#extensionSetup').formValidation('updateStatus', 'employeeName', 'NOT_VALIDATED');

				$('#extensionSetup').formValidation('updateStatus', 'coWorkerMobileNumber', 'NOT_VALIDATED');

				$('#extensionSetup').formValidation('updateStatus', 'coWorkerEmail', 'NOT_VALIDATED');

				next_tab();

			} else if ($(this).hasClass('step_4')) {


				$('#extensionSetup').formValidation('updateStatus', 'employeeName', 'VALID');

				$('#extensionSetup').formValidation('updateStatus', 'coWorkerMobileNumber', 'VALID');

				$('#extensionSetup').formValidation('updateStatus', 'coWorkerEmail', 'VALID');

				$('.wizard .nav-tabs li.active')
					.prev()
					.addClass('disabled');

				next_tab();

			} else if ($(this).hasClass('start_trial')) {

				var trial_started_at = Math.round(new Date().getTime() / 1000);

				chrome.runtime.sendMessage(extension_id, {

					message: 'activate',
					apiKey: apiKey,
					intercom_company_created_at: trial_started_at,
					corporation_id: selected_corporation_id,
					corporation_name: selected_corporation_name,
					department_id: selected_department_id,
					department_name: selected_department_name,
					department_created_at: now,
					intercom_company_account_manager_id: intercom_company_account_manager_id,
					intercom_company_account_manager_name: intercom_company_account_manager_name,
					intercom_company_account_manager_email: intercom_company_account_manager_email,
					intercom_company_account_manager_phone: intercom_company_account_manager_phone,
					intercom_employeee_id: intercom_company_account_manager_id,
					intercom_employeee_name: intercom_company_account_manager_name,
					intercom_employeee_email: intercom_company_account_manager_email,
					intercom_employeee_phone: intercom_company_account_manager_phone,
					intercom_employeee_created_at: now

				}, function(response) {

					console.log(response);

					if (response.message === 'extension_activated') {

						window.Intercom('update', {

							app_id: 'uiel53cc',

							email: selected_employee_email,
							"extension_activated": true,

							companies: [{

								// company_id: selected_department_id,
								id: selected_department_id,
								"parent_company_id": selected_corporation_id,
								"department_id": selected_department_id,
								monthly_spend: total_price_per_month,
								created_at: trial_started_at,

							}],

							widget: {

								activator: '#IntercomDefaultWidget'

							}

						});

						firebase_extension_ref.child(selected_department_id).update({

							"plan": "Trial",
							"monthly_spend": total_price_per_month,
							"trial_started_at": trial_started_at,

						}, function(error) {

							if (error) {

								console.warn('Company data could not be updated.' + error);

							} else {

								console.log('Company data updated successfully.');

								firebase_extension_ref.child(selected_department_id + '/users/' + selected_employeee_id).update({

									"extension_activated": true,

								}, function(error) {

									if (error) {

										console.warn('User data could not be updated.' + error);

									} else {

										console.log('User data updated successfully.');

									}

								});

							}

						});

						console.log('Trial Started for ' + selected_department_name);

						console.log('Extension is now activated.')

						next_tab();

						fbq('trackCustom', 'Purchase');


					} else {

						console.log('FUBAR!')

					}

				});

			} else {

				next_tab();

			}

		});

		$('.customer-support').on("click", function(event) {

			event.preventDefault();

			if ($(this).hasClass('activation-help')) {

				Intercom('showNewMessage', 'Hi,\n\nI need some help finishing my ' + extension_name + ' setup. My details are as follows:\n\nCompany ID: ' + selected_department_id + '\nCompany Name: ' + selected_department_name + '\nEmployee ID: ' + selected_employeee_id + '\nEmploye Name: ' + selected_employeee_name + '\n\nThank you,\n' + selected_employeee_name);

			} else if ($(this).hasClass('unauthorized-access')) {

				Intercom('showNewMessage', 'Notice on unauthorised use of RAMP Account.\n\nYour message: ');

			} else if ($(this).hasClass('copyright-violation')) {

				Intercom('showNewMessage', 'Notice on Copyright Violation.\n\nYour message: ');

			} else {

				Intercom('showNewMessage');

			}

		});

		$('.confirm').click(function(e) {

			e.preventDefault();

			setTimeout(function() {

				$('#extensionSetup').find('.terms').find('.form-control-feedback').hide();

			}, 50);

			$.when($('#extensionSetup').formValidation('validate'))
				.done(function() {

					if ($('#extensionSetup').data('formValidation').isValid()) {

						//console.log('Tab 4 is valid');

						//phone_btn_onclick()

						// No Account Kit Hack
						$('.wizard .nav-tabs li.active')
							.prev()
							.addClass('disabled');

						$.when($('#extensionSetup')
							.find('.form-group')
							.removeClass('has-feedback')
							//.addClass('disabled')
							.end()
							//.find('.form-control')
							.find('#employeeName')
							.each(function() {

								$(this).prop("disabled", true)

							})

						).done(function() {

							$('#extensionSetup')
								.find('[name="employeeName"]')
								.closest('.tab-pane')
								.find('.NOT_AUTHENTICATED')
								.fadeOut()
								.end()
								.find('[name="employeeName"]')
								.closest('.tab-pane')
								.find('.BAD_PARAMS')
								.fadeOut()
								.end()
								.find('.btn-group-create-account')
								.fadeOut();

						});

						countryData = $('#coWorkerMobileNumber').intlTelInput("getSelectedCountryData");

						country_code = '+' + countryData.dialCode;

						var ph_num = $('#coWorkerMobileNumber').intlTelInput("getNumber", intlTelInputUtils.numberFormat.NATIONAL).replace(/\s+/g, '');

						console.log(country_code + ph_num);

						now = Math.round(new Date().getTime() / 1000);
						selected_employee_email = $('#coWorkerEmail').val();
						selected_employee_national_phone = $('#coWorkerMobileNumber').val();
						selected_employee_international_phone = country_code + ' ' + selected_employee_national_phone;

						console.log(now);
						console.log(apiKey);
						console.log(selected_corporation_id);
						console.log(selected_corporation_name);
						console.log(selected_department_id);
						console.log(selected_department_name);
						console.log(selected_employeee_id);
						console.log(selected_employeee_name);
						console.log(selected_employee_international_phone);
						console.log(selected_employee_email);

						$('.company-does-not-exists-on-intercom')
							.find('.selected_department_name')
							.text(selected_department_name);

						window.Intercom('shutdown');

						if (intercom_company_exists === true) {

							chrome.runtime.sendMessage(extension_id, {

								message: 'activate',
								apiKey: apiKey,
								corporation_id: selected_corporation_id,
								corporation_name: selected_corporation_name,
								department_id: selected_department_id,
								department_name: selected_department_name,
								department_created_at: now,
								intercom_company_account_manager_id: intercom_company_account_manager_id,
								intercom_company_account_manager_name: intercom_company_account_manager_name,
								intercom_company_account_manager_email: intercom_company_account_manager_email,
								intercom_company_account_manager_phone: intercom_company_account_manager_phone,
								intercom_employeee_id: selected_employeee_id,
								intercom_employeee_name: selected_employeee_name,
								intercom_employeee_email: selected_employee_email,
								intercom_employeee_created_at: now


							}, function(response) {

								console.log(response);

								console.log('Response is ' + response.message);

								if (response.message === 'extension_activated') {

									var firebase_user_ref = firebase_extension_ref.child(selected_department_id + '/users/' + selected_employeee_id);

									firebase_user_ref.transaction(function(currentData) {

										if (currentData === null) {

											return {

												email: selected_employee_email,
												user_id: selected_employeee_id,
												created_at: now,
												signed_up_at: now,
												name: selected_employeee_name,
												"phone": selected_employee_international_phone,
												"account_manager": null,
												"extension_activated": true,

											};

										} else {

											console.warn('User ' + selected_employeee_name + ' already exists.');
											return; // Abort the transaction.

										}

									}, function(error, committed, snapshot) {

										if (error) {

											console.error('Transaction failed abnormally!', error);

										} else if (!committed) {

											console.warn('We aborted the transaction (because user ' + selected_employeee_name + ' already exists).');

											$('#extensionSetup').find('[wrapper-for="employee-phone-number"]').hide()
											$('#extensionSetup').find('.btn-group-create-account').hide()
											$('#extensionSetup').find('.btn-group-go-to-subscription').hide()
											$('#extensionSetup').find('.user-exists-on-intercom').fadeIn()
											//$('#extensionSetup').find('.btn-group-user-exists-on-intercom').fadeIn()
											$('#extensionSetup').find('.name-user-exists-on-intercom').text(selected_employeee_name)

											window.Intercom('boot', {
												app_id: 'uiel53cc',
												widget: {
													activator: '#IntercomDefaultWidget'
												}
											});

										} else {

											console.info('A new user named ' + selected_employeee_name + ' was added to ' + selected_department_name + '.');

											window.Intercom('boot', {

												app_id: 'uiel53cc',

												email: selected_employee_email,
												user_id: selected_employeee_id,
												created_at: now,
												signed_up_at: now,
												name: selected_employeee_name,
												"phone": selected_employee_international_phone,
												"account_manager": null,
												"extension_activated": true,

												companies: [{

													// company_id: selected_department_id,
													id: selected_department_id,
													"parent_company_id": selected_corporation_id,
													"department_id": selected_department_id,

												}],

												widget: {

													activator: '#IntercomDefaultWidget'

												}

											});

											$('#extensionSetup')
												.find('[name="employeeName"]')
												.closest('.tab-pane')
												.find('.PARTIALLY_AUTHENTICATED')
												.fadeIn()
												.end()
												.find('[name="employeeName"]')
												.closest('.tab-pane')
												.find('.btn-group-go-to-subscription')
												.fadeIn();

											function show_to_new_user_if_company_exists() {

												$('#complete .intercom_company_name').each(function(index) {

													$(this).text(selected_department_name);

												});

												$('#extensionSetup #complete .intercom_company_account_manager_name').text(intercom_company_account_manager_name);
												$('#extensionSetup #complete .intercom_company_account_manager_phone span').text(intercom_company_account_manager_phone);
												$('#extensionSetup #complete .intercom_company_account_manager_email a').attr('href', 'mailto:' + intercom_company_account_manager_email);
												$('#extensionSetup #complete .intercom_company_account_manager_email a').text(intercom_company_account_manager_email);
												$('#extensionSetup #complete span.extension-name').text(extension_name);
												$('#extensionSetup #complete .company-exists-on-intercom').fadeIn();

												$('h3.header').html('<strong>THANK YOU</strong> FOR SIGNING UP')
												$('#extensionSetup .nav-tabs li.subscription').remove();
												$('#extensionSetup .nav-tabs li').css('width', '16.6666667%');
												$('#extensionSetup #step5').remove();

												//next_tab();

											}

											$.when(show_to_new_user_if_company_exists()).done(function() {

												next_tab();

											});

											//show_to_new_user_if_company_exists();

										}

										console.log(selected_employeee_name + "'s data: ", snapshot.val());

									});

								} else {

									console.log('FUBAR!')

								}

							});

						} else {

							firebase_extension_ref.child(selected_department_id).set({

								"company_id": selected_department_id,
								"remote_created_at": now,
								"name": selected_department_name,
								"employee_count": selected_department_employee_count,
								"api_key": apiKey,
								"plan": null,
								"trial_started_at": null,
								"upgraded_at": null,
								"parent_company": selected_corporation_name,
								"account_manager": {

									"account_manager_id": selected_employeee_id,
									"account_manager_name": selected_employeee_name,
									"account_manager_email": selected_employee_email,
									"account_manager_phone": selected_employee_international_phone

								}

							}, function(error) {

								if (error) {

									console.warn('Company data could not be saved.' + error);

								} else {

									console.log('Company data saved successfully.');

									firebase_extension_ref.child(selected_department_id + '/users/' + selected_employeee_id).set({

										email: selected_employee_email,
										user_id: selected_employeee_id,
										created_at: now,
										signed_up_at: now,
										name: selected_employeee_name,
										"phone": selected_employee_international_phone,
										"account_manager": true,
										"extension_activated": false,

									}, function(error) {

										if (error) {

											console.warn('User data could not be saved.' + error);

										} else {

											console.log('User data saved successfully.');

											window.Intercom('boot', {

												app_id: 'uiel53cc',

												email: selected_employee_email,
												user_id: selected_employeee_id,
												created_at: now,
												signed_up_at: now,
												name: selected_employeee_name,
												"phone": selected_employee_international_phone,
												"account_manager": true,
												"extension_activated": false,

												companies: [{

													id: selected_department_id,
													"parent_company_id": selected_corporation_id,
													"department_id": selected_department_id,
													remote_created_at: now,
													name: selected_department_name,
													"employee_count": selected_department_employee_count,
													"api_key": apiKey,
													"parent_company": selected_corporation_name,
													"account_manager_id": selected_employeee_id,
													"account_manager_name": selected_employeee_name,
													"account_manager_email": selected_employee_email,
													"account_manager_phone": selected_employee_international_phone

												}],

												widget: {

													activator: '#IntercomDefaultWidget'

												}

											});

											$('#extensionSetup')
												.find('[name="employeeName"]')
												.closest('.tab-pane')
												.find('.PARTIALLY_AUTHENTICATED')
												.fadeIn()
												.end()
												.find('[name="employeeName"]')
												.closest('.tab-pane')
												.find('.btn-group-go-to-subscription')
												.fadeIn();

											$('#step5')
												.find('.company-does-not-exists-on-intercom')
												.fadeIn()

											next_tab();

											console.info('A new user was created: ' + selected_employeee_name);
											console.info('A new company was created: ' + selected_department_name);

											fbq('trackCustom', 'CompleteRegistration');

										}

									});

								}

							});

						}

					}

				});

		});

		// Add keypress ENTER support for API-key input

		$('#apiKey').keypress(function(e) {

			if (e.which == 13) {

				$('.next-step.step_2').trigger('click');

				return false; //<---- Add this line

			}

		});

		$('.prev-step').click(function(event) {

			event.preventDefault;

			if ($(this).hasClass('step_4')) {

				$('#employeeName').select2('data', null)
				$('#coWorkerMobileNumber').val('');
				$('#coWorkerEmail').val('');

				$.when($('#extensionSetup')
						.formValidation('updateStatus', 'employeeName', 'VALID')
						.formValidation('updateStatus', 'coWorkerMobileNumber', 'VALID')
						.formValidation('updateStatus', 'coWorkerEmail', 'VALID')
					)
					.done(function() {

						prev_tab();

						$('#extensionSetup')
							.find('.user-exists-on-intercom')
							.hide()
							.end()
							.find('[name="employeeName"]')
							.closest('.tab-pane')
							.find('.NOT_AUTHENTICATED')
							.hide()
							.end()
							.find('[name="employeeName"]')
							.closest('.tab-pane')
							.find('.BAD_PARAMS')
							.hide()
							.end()
							.find('[wrapper-for="employee-phone-number"]')
							.hide()
							.end()

					});

			} else {

				prev_tab();

			}

		});

	} else {

		// Do something in browsers that are NOT Google Chrome
		console.warn('This website requires Google Chrome... Please download it from https://www.google.com/chrome/browser/desktop/');

		$('.browser-is-not-chrome').fadeIn();

	}

	$('.terms-of-service').on("click", function(event) {

		event.preventDefault();

		$('#termsModal').modal('show')

	});

	$('#extensionSetup').find('[name="agree"]').val('no');

	$('.terms .material-icons').on('click', function() {

		if ($('#extensionSetup').find('[name="agree"]').val() === 'no') {

			$('#extensionSetup')
				.find('[name="agree"]').val('yes')
				.end()

		} else if ($('#extensionSetup').find('[name="agree"]').val() === 'yes') {

			$('#extensionSetup')
				.find('[name="agree"]').val('no')
				.end()

		}

		setTimeout(function() {

			$('#extensionSetup').find('.terms').find('.form-control-feedback').hide();

			if ($('#extensionSetup').find('[name="agree"]').val() === 'no') {

				$('.terms .material-icons').text('check_box_outline_blank');

				$('.terms .material-icons').css('color', '#F1C40F');

			} else if ($('#extensionSetup').find('[name="agree"]').val() === 'yes') {

				$('.terms .material-icons').text('check_box');

				$('.terms .material-icons').css('color', '#2AB766');

			}

		}, 100);

		$('#extensionSetup').formValidation('revalidateField', 'agree');

	});

	$('#agreeButton, #disagreeButton').on('click', function() {

		var whichButton = $(this).attr('id');

		$('#extensionSetup')
			.find('[name="agree"]')
			.val(whichButton === 'agreeButton' ? 'yes' : 'no')
			.end()
			// Revalidate the field manually
			.formValidation('revalidateField', 'agree');

		setTimeout(function() {

			$('#extensionSetup').find('.terms').find('.form-control-feedback').hide();

			if ($('#extensionSetup').find('[name="agree"]').val() === 'no') {

				$('.terms .material-icons').text('check_box_outline_blank');

				$('.terms .material-icons').css('color', '#F1C40F');

			} else if ($('#extensionSetup').find('[name="agree"]').val() === 'yes') {

				$('.terms .material-icons').text('check_box');

				$('.terms .material-icons').css('color', '#2AB766');

			}

		}, 100);


	});

});

function nextTab(elem) {
	$(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
	$(elem).prev().find('a[data-toggle="tab"]').click();
}
