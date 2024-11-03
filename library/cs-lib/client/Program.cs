using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cs_lib;
using cs_lib.Core;
using cs_lib.Core.Classes;
using cs_lib.Models;

namespace client
{
    internal class Run
    {
        // Initial
        private readonly cs_lib.Log _log;
        private readonly cs_lib.Client _client;

        // constructor Run()
        public Run(cs_lib.Log log, cs_lib.Client client)
        {
            _log = log;
            _client = client;
        }

        public static Run Create()
        {
            // Injection
            var config = new Config();
            var ptd = new Protected();
            var http = new HttpRequests(config);
            
            var log = new Log(http);
            var client = new cs_lib.Client(http, ptd);

            return new Run(log, client);
        }

        // Function Insert()
        public void Insert()
        {
            var arg = new cs_lib.Models.Args
            {
                StatusCode = "200",
                UserName = "Artemiik VV",
                Cookie = "2309283409c80923425345345345f345vt",
                IPAddress = "192.168.0.1",
                Authenticate = "jwt-v1",
            };
            
            _log.Insert("0293b2a8698b03ad200d2c96b44049cb00a84937efdf4a2bbda44976cef649d1d57b6f81e55cfac2571e45dea0cff9fe782caa40a663a260c4ef9b75b89d7f221f24f1e8ac76f604712c05d2b627e11ae5b1c10a9ead5e816dc35f12aff31a38", arg);
        }

        // Function Signin() 
        public void Signin()
        {
            _client.Signin("artemvlasiv1909@gmail.com", "Artym_1909");
        }
        
        // Function Delete()
        public void Delete()
        {
            _client.Signin("artemvlasiv1909@gmail.com", "Artym_1909");
            _client.Log<cs_lib.Models.DeleteModel>("delete", new cs_lib.Models.DeleteModel()
            {
                FileName = "artemiik"
            });
        }
    }
    
    /// <summary>
    /// Основной класс запуска
    /// </summary>
    internal class Program
    {
        static void Main(string[] args)
        {
            Run run = Run.Create();
            // run.Insert();
            // run.Signin();
            run.Delete();
        }
    }
}
