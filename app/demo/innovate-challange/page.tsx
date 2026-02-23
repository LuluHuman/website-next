"use client"

import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import BarcodeScanner from 'react-qr-barcode-scanner';

export default function InnovateChallenge() {

    const [data, setData] = useState<{ [uid: string]: number }>({});
    const [payingText, setText] = useState("Tap Card")
    const [totalPrice, setTotalPrice] = useState(0)
    const [paying, setPaying] = useState(false);
    const [db, setDb] = useState<{ uid: string, name: string, price: number }[]>([]);
    const cooldown = useRef<boolean>(false)

    useEffect(() => {
        fetch("/db.json")
            .then(d => d.json())
            .then(db => setDb(db))
    }, [])

    useEffect(() => {
        var total = 0
        Object.entries(data).forEach(([uid, qty], i) => {
            const item = db.find(item => item.uid == uid)
            total += (item?.price || 0) * qty
        })
        setTotalPrice(total)
    }, [data])
    return <div className="flex flex-col items-center">

        <div className='max-w-125'>{
            !paying
                ? <>
                    <BarcodeScanner
                        width={1000}
                        height={1000}
                        onUpdate={(err, result) => {
                            console.log(err);

                            if (result) {
                                if (cooldown.current) return
                                cooldown.current = true
                                setData((obj_old) => {
                                    const obj = { ...obj_old }
                                    const uid = result.getText()
                                    if (obj?.[uid]) obj[uid] = obj[uid] + 1
                                    else obj[uid] = 1
                                    return obj
                                });
                                setTimeout(() => {
                                    if (cooldown.current == true) cooldown.current = false
                                }, 3000);
                            } else {
                                cooldown.current = false
                            }
                        }}
                    />
                </>
                : <div className='flex align-middle'>
                    <button onClick={() => setText("Payed $ " + totalPrice)} className='text-center  min-w-lg w-1/2 h-screen'>{payingText}</button>
                </div>
        }</div>
        <div className='flex-1 w-full'>
            <TableContainer>
                <Table sx={{ minWidth: 650, color: "#e3b7f4" }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>-</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(data).map(([uid, qty], i) => {
                            const item = db.find(item => item.uid == uid)
                            return <TableRow key={i + "-" + uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}                            >
                                <TableCell className='w-0 p-2'>{<DeleteIcon color="error" onClick={() => {
                                    setData((data_old) => {
                                        const data = { ...data_old }
                                        if (data[uid] == 1) {
                                            delete data[uid]
                                            return data
                                        } else {
                                            data[uid] = data[uid] - 1
                                            return data
                                        }
                                    })
                                }} />}</TableCell>
                                <TableCell component="th" scope="row" className='w-0 p-2'>{qty}</TableCell>
                                <TableCell >{item?.name || "Unknown item"}</TableCell>
                                <TableCell align="right">${item?.price || "??.?"}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='p-2'>
                <Button onClick={() => setPaying(true)} variant="contained" disabled={paying}>Pay: ${totalPrice}</Button>
            </div>
        </div>

    </div>
}