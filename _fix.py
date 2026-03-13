import os

base = "/Users/neelanshu./Portfolio-Windows/public/ProductDesigns"

# \u202f = NARROW NO-BREAK SPACE (what macOS screenshots use before AM/PM)
NNBSP = "\u202f"

renames = [
    ("CookSense",  f"Screenshot 2026-03-05 at 8.46.53{NNBSP}PM.png", "img3.png"),
    ("CookSense",  f"Screenshot 2026-03-05 at 8.46.58{NNBSP}PM.png", "img4.png"),
    ("CookSense",  f"Screenshot 2026-03-05 at 8.47.04{NNBSP}PM.png", "img5.png"),
    ("SocialSense",f"Screenshot 2026-03-05 at 8.33.01{NNBSP}PM.png", "img2.png"),
    ("SocialSense",f"Screenshot 2026-03-05 at 8.33.08{NNBSP}PM.png", "img3.png"),
    ("SocialSense",f"Screenshot 2026-03-05 at 8.33.17{NNBSP}PM.png", "img4.png"),
    ("FindrTag",   f"Screenshot 2026-03-05 at 8.41.08{NNBSP}PM.png", "img1.png"),
    ("FindrTag",   f"Screenshot 2026-03-05 at 8.41.14{NNBSP}PM.png", "img2.png"),
    ("FindrTag",   f"Screenshot 2026-03-05 at 8.41.20{NNBSP}PM.png", "img3.png"),
]

for folder, src, dst in renames:
    src_path = os.path.join(base, folder, src)
    dst_path = os.path.join(base, folder, dst)
    if os.path.exists(src_path):
        os.rename(src_path, dst_path)
        print(f"OK: {folder}/{dst}")
    else:
        print(f"MISSING: {folder}/{src}")
