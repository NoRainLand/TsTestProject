import os


def main():
    os.system("git add .")
    os.system("git commit -m 'update'")
    os.system("git push")


main()