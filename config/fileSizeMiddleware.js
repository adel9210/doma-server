function checkTotalSize(req, res, next) {
    if (!req.files) {
        return next();
    }

    const totalSize = req.files.reduce((total, file) => total + file.size, 0);

    if (totalSize > 6000000) { // Total size limit of 6 MB
        return res.status(400).json({ message: 'Total file size exceeds the 6 MB limit.' });
    }

    next();
}

module.exports = checkTotalSize;
