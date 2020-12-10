/**
 * A table showing descriptions for the  bindings inferred by Prolog.
 *
 * @param options
 * @constructor
 */
function DescriptionTable(options){
    let that = this;
    options = options || {};

    const formatter = options.formatter || function(x){ return x; };

    this.widget = $("<div>");
    this.widget.addClass("card-body border-top");

    // create a section in the query card displaying one solution
    this.create = function(solution) {
        let item_container = $("<div>");
        item_container.addClass("container-fluid");
        //
        that.widget.text('');
        that.widget.append(that.create_table(solution));
        that.widget.append(item_container);
        return that.widget;
    };

    // Create a table of the solution description
    this.create_table = function(descriptions) {
        var tbody = $("<tbody>");
        var row = 0;
        var tr = $("<tr>");
        for (i = 0; i < descriptions[0].value1.length; i++) {
            var currentRow = parseInt(descriptions[0].value1[i]);
            var fieldData = descriptions[1].value1[i];

            if (currentRow == row) {
                var td1 = $("<td>");
                td1.text(formatter.format(fieldData));
                tr.append(td1);
            } else {
                tbody.append(tr);
                tr = $("<tr>");
                var td1 = $("<td>");
                td1.text(formatter.format(fieldData));
                tr.append(td1);
                row = currentRow;
            }
            
        }
        tbody.append(tr);
        //
        var table = $("<table>");
        table.addClass("card-table table table-sm table-hover table-striped table-bordered");
        table.append(tbody);
        return table;
    };
}
