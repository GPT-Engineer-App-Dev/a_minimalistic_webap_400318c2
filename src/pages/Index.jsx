import React, { useRef, useEffect } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

const Index = () => {
  const canvasRef = useRef(null);
  const toast = useToast();

  const drawMandelbrot = (ctx, width, height) => {
    const maxIter = 1000; // Maximum number of iterations
    const zoom = 150; // Zoom factor
    const panX = 2;
    const panY = 1.5;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let mx = (x - width / 2) / zoom - panX;
        let my = (y - height / 2) / zoom - panY;
        let cx = mx;
        let cy = my;
        let iter = 0;

        while (iter < maxIter && mx * mx + my * my < 4) {
          const xtemp = mx * mx - my * my + cx;
          my = 2 * mx * my + cy;
          mx = xtemp;
          iter++;
        }

        const color = iter === maxIter ? 0 : 255 - Math.floor((255 * iter) / maxIter);
        ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  const handleRender = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawMandelbrot(ctx, canvas.width, canvas.height);
    toast({
      title: "Mandelbrot set rendered.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;
  }, []);

  return (
    <Box p={4}>
      <canvas ref={canvasRef} />
      <Button leftIcon={<FaPlay />} colorScheme="teal" onClick={handleRender} mt={4}>
        Render Mandelbrot Set
      </Button>
    </Box>
  );
};

export default Index;
