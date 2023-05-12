package com.aptech.apiv1.utils.business;

import com.aptech.apiv1.enums.IataCode;
import com.aptech.apiv1.model.Baggage;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.UUID;

public class BagTagGenerator {
    public static String getBagTagNo(IataCode dest){
//        return  dest.toString()+(UUID.randomUUID().getLeastSignificantBits());
        return dest.toString()+Math.round(Math.random()*Math.pow(10, 9));
    }
    public static String genQRBagTag(Baggage baggage) throws IOException, WriterException {
        String qrCodePath = "C:\\Myself\\FPT-Aptech Course\\Semester_4\\s4prj\\src-code\\api-v1\\src\\main\\resources\\static\\qrcode\\baggage\\";
        String barCode = baggage.getTagNo()+"-QRBagTag.png";
        var qrCodeWriter = new QRCodeWriter();
        String data = baggage.toString();
        BitMatrix bitMatrix = qrCodeWriter.encode(
                data,
                BarcodeFormat.QR_CODE, 400, 400);
        Path path = FileSystems.getDefault().getPath(qrCodePath+barCode);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
        return barCode;
    }
}
