/**
 * Google Apps Script — ToolMatch 피드백 + 서베이 + 추적
 *
 * 배포 관리 > 연필(수정) > 새 버전 > 배포
 *
 * 컬럼 순서 (1-based):
 * 1:timestamp 2:type 3:sessionId 4:rating 5:comment
 * 6:q_role 7:q_goal 8:q_code_comfort 9:q_team 10:q_output
 * 11:q_security 12:q_ecosystem 13:q_urgency
 * 14:persona 15:skill 16:aiLevel 17:outputType
 * 18:primary 19:also
 * 20:source 21:shared 22:resultUrl 23:userAgent
 */

var COL_TYPE = 2;
var COL_SESSION = 3;
var COL_RATING = 4;
var COL_COMMENT = 5;
var COL_SHARED = 21;

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Ver2');
  if (!sheet) {
    sheet = ss.insertSheet('Ver2');
  }
  return sheet;
}

function doPost(e) {
  var sheet = getOrCreateSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'timestamp',
      'type',
      'sessionId',
      'rating',
      'comment',
      'q_role',
      'q_goal',
      'q_code_comfort',
      'q_team',
      'q_output',
      'q_security',
      'q_ecosystem',
      'q_urgency',
      'persona',
      'skill',
      'aiLevel',
      'outputType',
      'primary',
      'also',
      'source',
      'shared',
      'resultUrl',
      'userAgent',
    ]);
  }

  var data = JSON.parse(e.postData.contents);

  // feedback이 오면 같은 sessionId의 view 행을 찾아 덮어쓰기
  if (data.type === 'feedback' && data.sessionId) {
    var rows = sheet.getDataRange().getValues();
    for (var i = rows.length - 1; i >= 1; i--) {
      if (rows[i][COL_SESSION - 1] === data.sessionId && rows[i][COL_TYPE - 1] === 'view') {
        var row = i + 1; // 1-based
        sheet.getRange(row, COL_TYPE).setValue('feedback');
        sheet.getRange(row, COL_RATING).setValue(data.rating || '');
        sheet.getRange(row, COL_COMMENT).setValue(data.comment || '');
        sheet.getRange(row, COL_SHARED).setValue(data.shared || '');
        return ContentService
          .createTextOutput(JSON.stringify({ status: 'ok', updated: true }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
  }

  // view 이벤트이거나, 매칭되는 view 행이 없으면 새 행 추가
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.type || 'view',
    data.sessionId || '',
    data.rating || '',
    data.comment || '',
    data.q_role || '',
    data.q_goal || '',
    data.q_code_comfort || '',
    data.q_team || '',
    data.q_output || '',
    data.q_security || '',
    data.q_ecosystem || '',
    data.q_urgency || '',
    data.persona || '',
    data.skill || '',
    data.aiLevel || '',
    data.outputType || '',
    data.primary || '',
    data.also || '',
    data.source || '',
    data.shared || '',
    data.resultUrl || '',
    data.userAgent || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'ToolMatch Feedback API' }))
    .setMimeType(ContentService.MimeType.JSON);
}
