#!/bin/bash

# Phantom Domain 快速部署脚本
# 使用前请确保已安装 Git

echo "🚀 Phantom Domain 部署助手"
echo "========================="

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在 phantom-domain 目录下运行此脚本"
    exit 1
fi

# 获取 GitHub 用户名
read -p "请输入你的 GitHub 用户名: " github_username

# 创建仓库名
read -p "请输入仓库名称 (默认: phantom-domain): " repo_name
repo_name=${repo_name:-phantom-domain}

echo ""
echo "📋 配置信息："
echo "GitHub 用户名: $github_username"
echo "仓库名称: $repo_name"
echo "网站地址将是: https://$github_username.github.io/$repo_name/"
echo ""

read -p "确认继续？(y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "已取消"
    exit 0
fi

# 初始化 Git
echo "📦 初始化 Git 仓库..."
git init

# 添加所有文件
echo "📂 添加文件..."
git add .

# 提交
echo "💾 提交更改..."
git commit -m "Initial commit - Phantom Domain website"

# 设置分支
git branch -M main

# 添加远程仓库
echo "🔗 连接到 GitHub..."
git remote add origin "https://github.com/$github_username/$repo_name.git"

echo ""
echo "✅ 本地配置完成！"
echo ""
echo "📝 接下来请按照以下步骤操作："
echo ""
echo "1. 在 GitHub 创建新仓库："
echo "   https://github.com/new"
echo "   仓库名称: $repo_name"
echo "   设置为 Public（公开）"
echo ""
echo "2. 创建完成后，在终端运行："
echo "   git push -u origin main"
echo ""
echo "3. 在 GitHub 仓库页面："
echo "   Settings → Pages → Source 选择 'main' → Save"
echo ""
echo "4. 等待几分钟后访问:"
echo "   https://$github_username.github.io/$repo_name/"
echo ""
echo "祝你部署成功！🎉"