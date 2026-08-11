import React from 'react';
import { motion } from 'framer-motion';

const ArrowBackground = () => {
    // Generate random positions for arrows
    const arrows = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 360,
        duration: Math.random() * 20 + 10,
    }));

    return (
        <div style={styles.container}>
            {arrows.map((arrow) => (
                <motion.img
                    key={arrow.id}
                    src="/tracxn-arrow.png"
                    alt=""
                    style={{
                        ...styles.arrow,
                        left: `${arrow.x}%`,
                        top: `${arrow.y}%`,
                        width: `${arrow.scale * 40}px`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0.1, 0.3, 0.1],
                        rotate: [arrow.rotation, arrow.rotation + 45, arrow.rotation],
                    }}
                    transition={{
                        duration: arrow.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
    },
    arrow: {
        position: 'absolute',
        opacity: 0.1,
        filter: 'grayscale(100%)',
    }
};

export default ArrowBackground;
