const fs = require('fs');
const yamlFront = require('yaml-front-matter');
const MarkdownIt = require('markdown-it');
const prism = require('markdown-it-prism');
const tex = require('markdown-it-texmath');

let md = new MarkdownIt();
md.use(prism, { defaultLanguage: 'plain' });
md.use(tex, {
	engine: require('katex'),
	delimiters: 'dollars'
});

function deleteDirectory(path) {
	if (fs.existsSync(path)) {
		let list = fs.readdirSync(path);
		list.forEach(file => {
			let filePath = path + '/' + file;
			if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
			else deleteDirectory(filePath);
		});
		fs.rmdirSync(path);
	}
}

function makeDist() {
	deleteDirectory('dist');
	fs.mkdirSync('dist');
}

function build() {
	let list = fs.readdirSync('.');
	let data = {};
	list.forEach(file => {
		let stats = fs.statSync(file);
		if (stats.isFile()) {
			let parts = file.split('.');
			let extName = parts.slice(-1)[0];
			if (extName === 'md' && parts.length === 4) {
				console.log('Porcessing ', file);
				let fileName = parts[0] + '.' + parts[1] + '.' + parts[2];
				let contest = parts[0], problem = parts[1], ID = parts[2];
				data[contest] = data[contest] || {};
				data[contest][problem] = data[contest][problem] || {};
				data[contest][problem][ID] = yamlFront.loadFront(fs.readFileSync(file));
				let content = data[contest][problem][ID].__content.trim();
				fs.writeFileSync('dist' + '/' + file, content);
				fs.writeFileSync('dist' + '/' + fileName + '.html', md.render(content));
				delete data[contest][problem][ID].__content;
			}
		}
	});
	fs.writeFileSync('dist/list.json', JSON.stringify(data));
}

makeDist();
build();
