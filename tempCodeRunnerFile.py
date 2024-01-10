import os
import time


def main():
    os.system("git add .")
    os.system('git commit -m "update at ' + time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + '"')
    os.system("git push")

main()