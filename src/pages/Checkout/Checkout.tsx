import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/Button/Button';
import styles from './Checkout.module.css';

interface FormData {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  metodoPago: string;
}

export const CheckoutPage: FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<number>(1);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmitForm = () => {
    setStep(3); // Pasamos al paso de simulación final
  };

  const handleFinishSimulation = () => {
    clearCart();
    setStep(4); // Compra completada ficticia
  };

  return (
    <div className={styles.container}>

      {step <= 3 && (
        <div className={styles.stepper}>
          <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1. Resumen</div>
          <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2. Datos de Envío</div>
          <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3. Pago y Simulación</div>
        </div>
      )}


      {step === 1 && (
        <div className={styles.stepBox}>
          <h3>Paso 1: Detalle de tu orden</h3>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              <div className={styles.summaryList}>
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className={styles.summaryItem}>
                    <span>{product.name} (x{quantity})</span>
                    <strong>${((product.price ? parseFloat(product.price) : 12.50) * quantity).toFixed(2)}</strong>
                  </div>
                ))}
              </div>
              <div className={styles.totalBlock}>Total a pagar: ${totalPrice.toFixed(2)}</div>
              <div className={styles.btnRow}>
                <button className={styles.clearBtn} onClick={clearCart}>Vaciar Carrito</button>
                <Button variant="primary" onClick={() => setStep(2)}>Siguiente paso</Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* FORMULARIO CON REACT HOOK FORM */}
      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmitForm)} className={styles.stepBox}>
          <h3>Paso 2: Datos de Entrega</h3>
          
          <div className={styles.inputGroup}>
            <label>Nombre Completo</label>
            <input {...register("nombre", { required: "El nombre es obligatorio" })} />
            {errors.nombre && <span className={styles.err}>{errors.nombre.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Teléfono de Contacto</label>
            <input type="tel" {...register("telefono", { required: "El teléfono es requerido" })} />
            {errors.telefono && <span className={styles.err}>{errors.telefono.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Correo Electrónico</label>
            <input type="email" {...register("correo", { required: "Email inválido" })} />
            {errors.correo && <span className={styles.err}>{errors.correo.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Dirección de Envío</label>
            <input {...register("direccion", { required: "La dirección es obligatoria" })} />
            {errors.direccion && <span className={styles.err}>{errors.direccion.message}</span>}
          </div>

          <div className={styles.btnRow}>
            <button type="button" className={styles.clearBtn} onClick={() => setStep(1)}>Atrás</button>
            <Button variant="primary" type="submit">Continuar al Pago</Button>
          </div>
        </form>
      )}

      {/* METODO DE PAGO Y ENVIO SIMULADO */}
      {step === 3 && (
        <div className={styles.stepBox}>
          <h3>Paso 3: Método de Pago</h3>
          <p>Seleccioná cómo querés simular tu pago:</p>
          <div className={styles.paymentMethods}>
            <label><input type="radio" name="pago" defaultChecked /> Tarjeta de Crédito Ficticia</label>
            <label><input type="radio" name="pago" /> Efectivo al retirar</label>
          </div>
          
          <div className={styles.simulationNotice}>
            <strong>⚠️ Entorno de Simulación:</strong> Al presionar el botón se procesará un despacho de prueba controlado.
          </div>

          <div className={styles.btnRow}>
            <button className={styles.clearBtn} onClick={() => setStep(2)}>Atrás</button>
            <Button variant="primary" onClick={handleFinishSimulation}>Confirmar y Simular Envío</Button>
          </div>
        </div>
      )}

      {/* ÉXITO */}
      {step === 4 && (
        <div className={`${styles.stepBox} ${styles.successBox}`}>
          <h2>¡Pedido Simulado con Éxito! 🎉</h2>
          <p>Gracias por interactuar con el ecosistema de pruebas de Iris Perfumería.</p>
          <p>El camión virtual ya va camino a tu dirección registrada.</p>
        </div>
      )}
    </div>
  );
};