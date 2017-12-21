/**
 * Created by erandi on 12/21/17.
 */
$(document).ready(function () {
    $(".alert").hide();
});

function compareDocsTest() {
    /** TODO : read file objects and pass as an ajax request*/

    $(".alert").hide();
    var docs = [];
    $("textarea[name='doc[]']").each(function () {
        docs.push(this.value);
    });
    console.log(docs);

    var valid = true;
    for (var x in docs) {
        if (!docs[x] || docs[x].length === 0) {
            valid = false;
            break;
        }
    }

    if (!valid) {
        showError("Please insert all documents to compare");
        return;
    }

    console.log("comparing documents ...");

    $.ajax({
        url: "/spd/compare",
        method: 'post',
        data: {
            docs: docs
        }
    }).done(function (data) {
        console.log(data);
        var sim = data.similarities;
        var text = "<ul>";
        for (var i in sim) {
            for (var j in sim[i]) {
                text += "<li> Doc " + i + " and Doc " + j + " -> " + sim[i][j].toFixed(2) + "</li>"
            }
        }
        text += "</ul>";

        showSuccess(text);
    }).fail(function (err) {
        console.log(err);
        showError("Error occurred when processing documents");
    });
}

function showError(msg) {
    console.log("Error - %s", msg);
    $('#errorMsg').text(msg);
    $('#errorBox').show();
}

function showSuccess(msg) {
    console.log("Success - %s", msg);
    $('#successBox').html(msg);
    $('#successBox').show();
}