const counterService = require("../services/counter.service");

function getCounters(req, res) {

    try {

        res.json(counterService.getCounters());

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}

function setStatus(req, res) {

    try {

        const id = Number(req.body.id);
        const status = req.body.status;

        counterService.setCounterStatus(id, status);

        res.json({
            success: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}

// ================================
// UPDATE COUNTER
// ================================

function updateCounter(req, res) {

    try {

        const id = Number(req.params.id);

        const { nama, layanan } = req.body;

        if (!id || !nama || !layanan) {

            return res.status(400).json({
                success: false,
                message: "ID, nama, dan layanan wajib diisi"
            });

        }

        const result = counterService.updateCounter(
            id,
            nama.trim(),
            layanan
        );

        if (result.changes === 0) {

            return res.status(404).json({
                success: false,
                message: "Counter tidak ditemukan"
            });

        }

        res.json({

            success: true,

            message: "Counter berhasil diperbarui"

        });

    } catch (err) {

        console.error("Update counter error:", err);

        res.status(500).json({

            success: false,

            message: "Gagal memperbarui counter"

        });

    }

}

module.exports = {

    getCounters,

    setStatus,

    updateCounter

};