import * as vscode from "vscode";
import { exec } from "child_process";

export function activate(context) {
  let disposable = vscode.workspace.onDidSaveTextDocument((document) => {
    if (document.languageId === "javascript") {
      exec(`node ${__dirname}/../bin/mylinter.js ${document.fileName}`, (err, stdout) => {
        if (stdout) vscode.window.showWarningMessage(stdout);
      });
    }
  });

  context.subscriptions.push(disposable);
}