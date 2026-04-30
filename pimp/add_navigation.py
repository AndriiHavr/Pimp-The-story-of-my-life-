#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import xml.etree.ElementTree as ET
import os
from pathlib import Path
import re

# Парсимо toc.ncx
toc_file = "toc.ncx"
tree = ET.parse(toc_file)
root = tree.getroot()

# Витягуємо навігацію
namespace = {'ncx': 'http://www.daisy.org/z3986/2005/ncx/'}
chapters = []

def extract_chapters(nav_point, parent_path=""):
    """Рекурсивно витягуємо всі розділи"""
    text = nav_point.find('.//ncx:navLabel/ncx:text', namespace)
    content = nav_point.find('ncx:content', namespace)
    
    if text is not None and content is not None:
        filename = content.get('src', '')
        chapter_name = text.text.strip() if text.text else ''
        chapters.append({
            'name': chapter_name,
            'file': filename
        })
    
    # Обробляємо вложені розділи
    for sub_point in nav_point.findall('ncx:navPoint', namespace):
        extract_chapters(sub_point, parent_path)

nav_map = root.find('.//ncx:navMap', namespace)
if nav_map is not None:
    for nav_point in nav_map.findall('ncx:navPoint', namespace):
        extract_chapters(nav_point)

print(f"Знайдено {len(chapters)} розділів:")
for i, ch in enumerate(chapters):
    print(f"  {i+1}. {ch['name']} -> {ch['file']}")

# Генеруємо HTML для меню
def generate_menu_html(current_file):
    """Генеруємо HTML для бічного меню"""
    menu_items = []
    for chapter in chapters:
        is_current = chapter['file'] == current_file
        active_class = ' class="menu-item-active"' if is_current else ''
        menu_items.append(f'            <li{active_class}><a href="{chapter["file"]}">{chapter["name"]}</a></li>')
    
    menu_html = '''<nav class="sidebar-nav">
        <div class="sidebar-title">Навігація</div>
        <ul class="menu-list">
''' + '\n'.join(menu_items) + '''
        </ul>
    </nav>'''
    return menu_html

# Функція для додавання меню до HTML файлу
def add_navigation_to_html(filename):
    """Додаємо навігацію до HTML файлу"""
    if not os.path.exists(filename):
        print(f"  ⚠ Файл не існує: {filename}")
        return False
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Перевіряємо чи вже додано навігацію
        if 'sidebar-nav' in content:
            print(f"  ✓ Навігація вже існує: {filename}")
            return True
        
        # Генеруємо меню
        menu_html = generate_menu_html(filename)
        
        # Додаємо обгортку для контенту та бічного меню
        wrapper_start = '<div class="page-wrapper">\n' + menu_html + '\n<div class="content-wrapper">'
        wrapper_end = '</div>\n</div>'
        
        # Замінюємо <body> тегом на обгорнутий контент
        # Знаходимо де закінчується <body class="...">
        body_pattern = r'(<body[^>]*>)'
        content = re.sub(body_pattern, r'\1' + wrapper_start, content, count=1)
        
        # Замінюємо </body> на закриття обгортки
        content = content.replace('</body>', wrapper_end + '\n</body>', 1)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  ✓ Навігація додана: {filename}")
        return True
    except Exception as e:
        print(f"  ✗ Помилка при обробці {filename}: {e}")
        return False

# Обробляємо всі HTML файли
print("\nДодаємо навігацію до HTML файлів:")
success_count = 0
for chapter in chapters:
    if add_navigation_to_html(chapter['file']):
        success_count += 1

print(f"\n✓ Обробка завершена: {success_count}/{len(chapters)} файлів успішно оновлено")

# Оновлюємо CSS
print("\nОновлюємо CSS...")
css_content = """
/* Стилі для навігації */
.page-wrapper {
    display: flex;
    width: 100%;
}

.sidebar-nav {
    width: 200px;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    padding: 20px 0;
    overflow-y: auto;
    box-sizing: border-box;
    z-index: 100;
}

.sidebar-title {
    padding: 10px 15px;
    font-weight: bold;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
}

.menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-list li {
    margin: 0;
    padding: 0;
}

.menu-list a {
    display: block;
    padding: 10px 15px;
    color: #0066cc;
    text-decoration: none;
    font-size: 13px;
    border-left: 3px solid transparent;
    transition: all 0.2s ease;
}

.menu-list a:hover {
    background-color: #e8e8e8;
    border-left-color: #0066cc;
}

.menu-item-active a {
    background-color: #e3f2fd;
    border-left-color: #0066cc;
    font-weight: bold;
    color: #0044aa;
}

.content-wrapper {
    margin-left: 200px;
    padding: 20px;
    flex: 1;
    width: calc(100% - 200px);
    box-sizing: border-box;
}

/* Адаптивна версія для менших екранів */
@media (max-width: 768px) {
    .sidebar-nav {
        width: 100%;
        position: relative;
        height: auto;
        border-bottom: 1px solid #ddd;
        border-right: none;
    }
    
    .content-wrapper {
        margin-left: 0;
        width: 100%;
    }
}

/* Переконатися що основний контент коректно відображається */
.calibre {
    margin-left: 0;
    margin-right: 0;
}
"""

try:
    with open('stylesheet.css', 'a', encoding='utf-8') as f:
        f.write('\n' + css_content)
    print("✓ CSS оновлено")
except Exception as e:
    print(f"✗ Помилка при оновленні CSS: {e}")

print("\n✅ Все завершено! Навігація успішно додана до книги.")
