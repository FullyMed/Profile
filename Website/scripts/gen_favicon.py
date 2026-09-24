"""Regenerates the favicon PNG/ICO set from the "MF" monogram design.

Run from anywhere with Pillow installed (`pip install pillow`):

    python scripts/gen_favicon.py

Writes favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png,
android-chrome-192x192.png, and android-chrome-512x512.png to the project root.
favicon.svg is hand-authored separately and isn't produced by this script — keep
it in sync by eye if the design changes here.
"""

from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRIMARY = (59, 130, 246, 255)  # #3b82f6 — matches tailwind.config's `primary` color
WHITE = (255, 255, 255, 255)
FONT_PATH = r"C:\Windows\Fonts\arialbd.ttf"


def make_master(size=1024):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = int(size * 0.225)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=PRIMARY)

    text = "MF"
    font = ImageFont.truetype(FONT_PATH, int(size * 0.50))
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1]
    draw.text((x, y), text, font=font, fill=WHITE)
    return img


def main():
    master = make_master(1024)

    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
    }
    for name, sz in sizes.items():
        master.resize((sz, sz), Image.LANCZOS).save(os.path.join(OUT, name))
        print("wrote", name, sz)

    master.resize((256, 256), Image.LANCZOS).save(
        os.path.join(OUT, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("wrote favicon.ico")


if __name__ == "__main__":
    main()
