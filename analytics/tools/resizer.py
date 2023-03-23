# Copyright © 2023 Louis Dace  ldace@dace-it.us All rights reserved. script code is protected by copyright law and
# may not be reproduced, distributed, or transmitted in any form or by any means, without the prior written
# permission of the author. Use of this script code is subject to the terms and conditions of the Louis Dace License
# Agreement.

import os
from PIL import Image


class ImageResizer:
    def __init__(self, dir_path, files):
        self.dir_path = dir_path
        self.files = files

    def scale10x(self):

        if not os.path.isdir('{}/scale10x'.format(self.dir_path)):
            os.makedirs('{}/scale10x'.format(self.dir_path))

        for file in self.files:
            img = Image.open(file)
            width, height = img.size
            new_size = (width * 10, height * 10)
            resized_img = img.resize(new_size)
            filename = '{}/scale10x/{}'.format(self.dir_path, file.name)
            resized_img.save(filename)

    def scale4k(self):

        if not os.path.isdir('{}/scale4k'.format(self.dir_path)):
            os.makedirs('{}/scale4k'.format(self.dir_path))

        for file in self.files:
            img = Image.open(file)
            new_size = (3840, 2160)
            resized_img = img.resize(new_size)
            filename = '{}/scale4k/{}'.format(self.dir_path, file.name)
            resized_img.save(filename)

    def custom_scale(self, height, width):

        if not os.path.isdir('{}/custom{}x{}'.format(self.dir_path, height, width)):
            os.makedirs('{}/custom{}x{}'.format(self.dir_path, height, width))

        for file in self.files:
            img = Image.open(file)
            new_size = (int(height), int(width))
            resized_img = img.resize(new_size)
            filename = '{}/custom{}x{}/{}'.format(self.dir_path, height, width, file.name)
            resized_img.save(filename)


