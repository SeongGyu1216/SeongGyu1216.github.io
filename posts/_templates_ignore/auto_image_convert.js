module.exports = async (plugin) => {
    const workspace = plugin.app.workspace;

    workspace.on('editor-paste', (evt, editor) => {
        const text = editor.getValue();
        const replaced = text.replace(/!\[\[(.+?)\]\]/g, '![]($1)');
        if (text !== replaced) editor.setValue(replaced);
    });
};
