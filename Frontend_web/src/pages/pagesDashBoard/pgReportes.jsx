import React from 'react';
import ProgressBar from '../../components/ProgresesBar';
import AsistenciaTortaConsultorio from '../../components/AsistenciaTortaConsultorio';
 
const PgReportes = () => {
      return (
        <div>          
          <div className="flex justify-center items-center mt-4">
            <AsistenciaTortaConsultorio/>
          </div>
          <div className="flex justify-center items-center">
            <ProgressBar/>
          </div>
        </div>
      );
    }
    


export default PgReportes;
