import glob
import re
import os

os.chdir(r'c:\Users\User\Desktop\books\pimp')

# Знаходимо всі HTML файли
html_files = glob.glob('CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_*.html')

for file_path in sorted(html_files):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Додаємо CSS посилання перед </head>
    if 'navigation.css' not in content:
        content = re.sub(r'</head>', '<link href="navigation.css" type="text/css" rel="stylesheet"/>\n</head>', content)
    
    # Додаємо JS посилання перед </body>
    if 'navigation.js' not in content:
        content = re.sub(r'</body>', '<script src="navigation.js"><\/script>\n</body>', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Оновлено: {file_path}")

print("Готово!")
