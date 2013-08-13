Ext.namespace('mrl.renderer');

mrl.renderer.comboRenderer = function (value, metaData, record, rowIndex, colIndex, store, view) {
    var grid = this;
    var combo;

    var editor = grid.getView().editingPlugin.getEditor(record, grid.columns[colIndex - 1]);
    if (editor)
        combo = editor.field;
    if (combo) {
        var comboStore = combo.store,
            rec;
        if (!comboStore.loading) {
            rec = comboStore.findRecord(combo.valueField, value);
            return rec ? rec.get(combo.displayField) : combo.valueNotFoundText;
        } else {
            var si = setInterval(function () {
                if (!comboStore.loading) {
                    clearInterval(si);
                    rec = combo.findRecord(combo.valueField, value);
                    grid.getView().getCell(record, grid.columns[colIndex - 1]).dom.firstChild.innerHTML = rec ? rec.get(combo.displayField) : combo.valueNotFoundText;
                }
            }, 100);
            return '»«“ŒÊ«‰Ì...';
        }
    }
    return '';
};