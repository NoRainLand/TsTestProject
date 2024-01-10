import os
import subprocess

userName = "NoRain"
userEmail = "wuxinrufeng@qq.com"

def main():
    os.system(f"git config --local user.name {userName}")
    os.system(f"git config --local user.email {userEmail}")
    # 判断是否有参数
    name = subprocess.getoutput("git config --local user.name")
    email = subprocess.getoutput("git config --local user.email")
    if name == userName and email == userEmail:
        print('执行成功')

main()