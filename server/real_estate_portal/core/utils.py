def upload_to(instance, filename):
    """
    Handle which directory files should be saved.
    """
    return 'images/{filename}'.format(filename=filename)