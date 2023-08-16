const ora = require("ora");
const path = require("path");
const spinner = ora();
const { mkdirSyncGuard, copyFileByGuard, copyTmpl } = require("./util");
const { Install } = require("./bin/install");
const { tgz } = require("compressing");

function init(cmdPath, option) {
  const { name, pathname, manager, template } = option;

  const target = path.resolve(cmdPath, pathname);

  mkdirSyncGuard(target);

  if (template === "default") {
    copyFileByGuard(path.resolve(__dirname, "../cli/template/scss/"), target); // 复制文件夹内容

    // 处理模板内容
    const templates = [
      { template: "./template/package/package.json.tmpl", to: "package.json" },
      {
        template: "./template/package/project.config.json.tmpl",
        to: "project.config.json",
      },
    ];

    templates.forEach((p) => {
      copyTmpl(
        path.resolve(__dirname, p.template),
        path.resolve(__dirname, p.to),
        option
      );
    });
  } else {
    tgz
      .uncompress(
        path.resolve(__dirname, `./template/${template}.tgz`),
        path.resolve(cmdPath, pathname)
      )
      .then(() => {
        spinner.succeed("evamp create project successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  Install(cmdPath, name, option).then(() => {
    spinner.succeed("evamp Install node_modules successfully");
  });
}

exports.init = init;
