/**
 * Google Apps Script for Educator Survey
 *
 * SETUP INSTRUCTIONS:
 * 1. Open the Google Sheet: https://docs.google.com/spreadsheets/d/1TDkQ-CtALrDgb3qNFlu2OUGBglzaIXN6AeVek3pbIao
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Deploy > New deployment
 * 5. Select type: "Web app"
 * 6. Set "Execute as": Me
 * 7. Set "Who has access": Anyone
 * 8. Click Deploy, authorize when prompted
 * 9. Copy the Web app URL
 * 10. Paste it into index.html replacing 'PASTE_YOUR_WEB_APP_URL_HERE'
 */

const HEADERS = [
  'timestamp',
  'schoolType',
  'county',
  'district',
  'districtOther',
  'schoolName',
  'yearsTeaching',
  'gradeLevels',
  'subjects',
  'subjectsOther',
  'hasOneToOne',
  'deviceType',
  'deviceTypeOther',
  'positiveImpact',
  'appropriateTime',
  'differentiateInstruction',
  'preferPrint',
  'noPrintAvailable',
  'subscriptionBeneficial',
  'mandateUsage',
  'mandateDetails',
  'aiStudentLearning',
  'aiTeacherWorkflow',
  'deviceMonitored',
  'clearProcedures',
  'consistentProcedures',
  'techForward',
  'classTimeDevices',
  'classTimeClarify',
  'digitalLiteracy',
  'digitalLiteracyOther',
  'confidentTeachingSafety',
  'adequatePD',
  'interestedAITraining',
  'onlineTestingIncreasedTime',
  'moreTechThanNecessary',
  'pressureFromAdmin',
  'negativeImpactTeaching',
  'additionalTeaching',
  'additionalTeachingOther',
  'pssaIssues',
  'devicePolicyType',
  'devicePolicyOther',
  'buildingRule',
  'buildingRuleOther',
  'phoneDisruptions',
  'phoneChallenges',
  'phoneChallengesOther',
  'phoneBenefits',
  'phoneBenefitsOther',
  'supportNeeds',
  'supportNeedsOther',
  'policyRequests',
  'positiveTechUses',
  'techConcerns',
  'desiredChanges',
  'anythingElse',
  'contactEmail'
];

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Set up headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }

    // Map data to row based on headers
    var row = HEADERS.map(function(header) {
      return data[header] || '';
    });

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Educator Survey API is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
