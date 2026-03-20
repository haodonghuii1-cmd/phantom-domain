# 将 Phantom Domain 发布到 GitHub Pages

## 步骤 1：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 仓库名称输入：`phantom-domain`（或其他名称）
4. 设置为 Public（公开）
5. 点击 "Create repository"

## 步骤 2：上传项目文件

### 方法 A：通过 GitHub 网页上传
1. 在仓库页面点击 "uploading an existing file"
2. 将 phantom-domain 文件夹内的所有文件拖拽上传
3. 填写 commit message（如 "Initial upload"）
4. 点击 "Commit changes"

### 方法 B：使用 Git 命令行
```bash
cd /Users/haodonghui/Desktop/learning/phantom-domain
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/phantom-domain.git
git push -u origin main
```

## 步骤 3：启用 GitHub Pages

1. 在仓库页面点击 "Settings"
2. 左侧菜单找到 "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main"，文件夹选择 "/ (root)"
5. 点击 "Save"

## 步骤 4：访问网站

等待几分钟后，你的网站将发布在：
```
https://你的用户名.github.io/phantom-domain/
```

## 自定义域名（可选）

如果你有自己的域名，可以：
1. 在 Pages 设置中的 "Custom domain" 输入你的域名
2. 在你的域名 DNS 设置中添加 CNAME 记录指向 `你的用户名.github.io`

## 注意事项

- 首次部署可能需要等待 10-20 分钟
- 确保 `index.html` 在根目录
- 所有资源路径都是相对路径
- GitHub Pages 是静态网站托管，不支持后端功能